import {TextEditor, window} from "vscode";
import {setIsLocizeButtonVisible, getTranslationFileType} from "../core";
import {LocizeDevAction} from "./LocizeDevAction";
import {LocizeGetAction} from "./LocizeGetAction";

export class LocizeButtonGroup {
  async execute() {
    const choice = await window.showQuickPick(
      ['Locize DEV', 'Locize GET'],
      { placeHolder: 'Select action' }
    );

    if (!choice) {return;}

    switch(choice) {
      case 'Locize DEV':
        new LocizeDevAction().execute();
        break;
      case 'Locize GET':
        new LocizeGetAction().execute();
        break;
    }
  }

  async onDidChangeActiveTextEditor(editor: TextEditor | undefined) {
    if (!editor || !editor.document) {
      setIsLocizeButtonVisible(false);
      return;
    }

    const isVisible = Boolean(getTranslationFileType(editor.document.uri.fsPath));

    setIsLocizeButtonVisible(isVisible);
  }
}
