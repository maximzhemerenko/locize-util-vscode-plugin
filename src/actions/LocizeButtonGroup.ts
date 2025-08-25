import {TextEditor, window} from "vscode";
import {setIsLocizeButtonVisible, getTranslationFileType} from "../core";
import {LocizeDevAction} from "./LocizeDevAction";
import {LocizeGetAction} from "./LocizeGetAction";
import {LocizeGetAllAction} from "./LocizeGetAllAction";

const LOCIZE_DEV = "LOCIZE DEV";
const LOCIZE_GET = "LOCIZE GET";
const LOCIZE_GET_ALL = "LOCIZE GET ALL";

export class LocizeButtonGroup {
  async execute() {
    const actions = [
      LOCIZE_DEV,
      LOCIZE_GET,
      LOCIZE_GET_ALL,
    ];

    const choice = await window.showQuickPick(
      actions,
      {placeHolder: 'Select action'}
    );

    if (!choice) {
      return;
    }

    switch (choice) {
      case LOCIZE_DEV:
        await new LocizeDevAction().execute();
        break;
      case LOCIZE_GET:
        await new LocizeGetAction().execute();
        break;
      case LOCIZE_GET_ALL:
        await new LocizeGetAllAction().execute();
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
