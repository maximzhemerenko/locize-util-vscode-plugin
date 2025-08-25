import {ShellScript} from "./shell";
import {saveAllWorkspaceFiles} from "./pluginUtils";

class TranslationUtil {
  async run(command: string, namespace?: string) {
    await saveAllWorkspaceFiles();

    const args = ['yarn', 'locize', command];

    if (namespace) {
      args.push('--namespace', namespace);
    }

    await ShellScript.run(args);
  }
}

const translationUtil = new TranslationUtil();

export {translationUtil as TranslationUtil};
