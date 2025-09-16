import {readFileSync} from "fs";
import {getWorkspaceRoot} from "./pluginUtils";
import {execSync} from "node:child_process";

type AppVersion = Record<string, {version: string}>;

export interface Release {
  version: string;
  product: string;
}

export const getReleases = (): Release[] => {
  const fileContent = readFileSync(`${getWorkspaceRoot()}/appVersion.json`, {
    encoding: 'utf-8',
  });

  const appVersion: AppVersion = JSON.parse(fileContent);

  return Object.entries(appVersion).map(([product, data]) => ({
    version: data.version,
    product,
  }));
};

function getAllRemoteBranches(): string[] {
  const output = execSync("git --no-pager branch -a", {
    cwd: getWorkspaceRoot(),
    encoding: "utf-8",
  });

  return output.split("\n");
}

function extractProductVersion(branch: string, regExp: RegExp): string | undefined {
  const match = branch.match(regExp);
  return match?.at(1);
}

const extractReleaseFromBranch = (branch: string): Release | undefined => {
  // slotoking
  let version = extractProductVersion(branch, /\/release\/release-(\d+\.\d+\.\d+)/);
  if (version) {
    return {version, product: "slotoking"};
  }

  // 777
  version = extractProductVersion(branch, /\/release\/777\/release-(\d+.\d+.\d+)/);
  if (version) {
    return {version, product: "777"};
  }

  // vegas
  version = extractProductVersion(branch, /\/release\/vegas\/release-(\d+\.\d+\.\d+)/);
  if (version) {
    return {version, product: "vegas"};
  }

  return undefined;
};

export const getAllReleases = (): Release[] => {
  const releases: Release[] = [];

  const branches = getAllRemoteBranches();

  branches.forEach(branch => {
    const release = extractReleaseFromBranch(branch);
    if (!release) {return;}

    releases.push(release);
  });

  return releases;
};
