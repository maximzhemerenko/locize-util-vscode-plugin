import {getActiveEditor, getEditorFilePath, getNamespace, TranslationUtil} from "../core";

export class LocizeDevAction {
  async execute() {
    const editor = getActiveEditor();
    if (!editor) {return;}

    const filePath = getEditorFilePath(editor);

    await TranslationUtil.run("dev", getNamespace(filePath));
  }
}
