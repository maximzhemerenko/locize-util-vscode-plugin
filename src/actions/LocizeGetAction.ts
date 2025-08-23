import {getActiveEditor, getEditorFilePath, getNamespace, TranslationUtil} from "../core";

export class LocizeGetAction {
  async execute() {
    const editor = getActiveEditor();
    if (!editor) {return;}

    const filePath = getEditorFilePath(editor);

    await TranslationUtil.run("get", getNamespace(filePath));
  }
}
