import {getActiveEditor, getEditorFilePath, getNamespace, TranslationUtil} from "../core";
import {window} from "vscode";

export class LocizeDevSyncAction {
  async execute() {
    const editor = getActiveEditor();
    if (!editor) {return;}

    const filePath = getEditorFilePath(editor);

    const namespace = getNamespace(filePath);

    if (await window.showWarningMessage(
      `Do you really want to overwrite the "${namespace}" namespace with your local version? This will remove any translations that may have been added by other developers.`,
      { modal: true },
      "Yes",
    ) !== "Yes") {
      return;
    }

    await TranslationUtil.run("dev", {
      namespace,
      sync: true,
    });
  }
}
