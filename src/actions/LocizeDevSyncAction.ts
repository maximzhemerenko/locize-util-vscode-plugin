import {getActiveEditor, getEditorFilePath, getNamespace, Release, TranslationUtil} from "../core";
import {window} from "vscode";

interface LocizeDevSyncActionOptions {
  release?: Release;
}

export class LocizeDevSyncAction {
  constructor(private readonly options?: LocizeDevSyncActionOptions) {}

  async execute() {
    const editor = getActiveEditor();
    if (!editor) {return;}

    const filePath = getEditorFilePath(editor);

    const namespace = getNamespace(filePath);

    const release = this.options?.release;

    const versionDescription = !release ? '' : `(${release.product} ${release.version})`;

    if (await window.showWarningMessage(
      `Do you really want to overwrite the "${namespace}" namespace ${versionDescription} with your local version? This will remove any translations that may have been added by other developers.`,
      { modal: true },
      "Yes",
    ) !== "Yes") {
      return;
    }

    await TranslationUtil.run("dev", {
      namespace,
      sync: true,
      release: this.options?.release,
    });
  }
}
