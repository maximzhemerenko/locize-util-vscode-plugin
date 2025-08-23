import {ShellScript} from "./shell";
import {saveAllWorkspaceFiles} from "./pluginUtils";

class TranslationUtil {
  async run(command: string, namespace: string) {
    await saveAllWorkspaceFiles();

    await ShellScript.run('yarn', 'locize', command, '--namespace', namespace);
  }
}

const translationUtil = new TranslationUtil();

export {translationUtil as TranslationUtil};
