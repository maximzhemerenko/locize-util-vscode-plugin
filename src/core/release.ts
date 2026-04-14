import {readFileSync} from "fs";
import {getWorkspaceRoot} from "./pluginUtils";

type AppVersion = {version: string};

export interface Release {
  version: string;
}

const readAppVersion = () => {
  const fileContent = readFileSync(`${getWorkspaceRoot()}/appVersion.json`, {
    encoding: 'utf-8',
  });

  return JSON.parse(fileContent) as AppVersion;
};

export const getRelease = (): Release => readAppVersion();
