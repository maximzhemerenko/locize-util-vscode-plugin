import {ShellScript} from "./shell";
import {saveAllWorkspaceFiles} from "./pluginUtils";
import {Release} from "./release";

interface IRunOptions {
  namespace?: string;
  sync?: boolean;
  release?: Release;
}

class TranslationUtil {
  async run(command: string, options?: IRunOptions) {
    await saveAllWorkspaceFiles();

    const args = ['yarn', 'locize', command];

    if (options?.release) {
      args.push(options.release.version, `--${options.release.product}`);
    }

    if (options?.namespace) {
      args.push('--namespace', options.namespace);
    }

    if (options?.sync) {
      args.push('--sync');
    }

    await ShellScript.run(args);
  }
}

const translationUtil = new TranslationUtil();

export {translationUtil as TranslationUtil};
