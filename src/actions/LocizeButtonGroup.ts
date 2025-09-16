import {QuickPickItem, QuickPickItemKind, TextEditor, window} from "vscode";
import {getTranslationFileType, setIsLocizeButtonVisible} from "../core";
import {LocizeDevAction} from "./LocizeDevAction";
import {LocizeGetAction} from "./LocizeGetAction";
import {LocizeGetAllAction} from "./LocizeGetAllAction";
import {LocizeDevSyncAction} from "./LocizeDevSyncAction";
import {LocizeReleaseGroup} from "./LocizeReleaseGroup";

const LOCIZE_DEV = "LOCIZE DEV";
const LOCIZE_DEV_SYNC = "LOCIZE DEV SYNC";
const LOCIZE_GET = "LOCIZE GET";
const LOCIZE_GET_ALL = "LOCIZE GET ALL";
const LOCIZE_RELEASE = "LOCIZE RELEASE >";

export class LocizeButtonGroup {
  async execute() {
    const actions: QuickPickItem[] = [
      {label: LOCIZE_DEV},
      {label: LOCIZE_DEV_SYNC},
      {label: '', kind: QuickPickItemKind.Separator},
      {label: LOCIZE_GET},
      {label: LOCIZE_GET_ALL},
      {label: '', kind: QuickPickItemKind.Separator},
      {label: LOCIZE_RELEASE}
    ];

    const choice = await window.showQuickPick(
      actions,
      {placeHolder: 'Select action'}
    );

    if (!choice) {
      return;
    }

    switch (choice.label) {
      case LOCIZE_DEV:
        await new LocizeDevAction().execute();
        break;
      case LOCIZE_DEV_SYNC:
        await new LocizeDevSyncAction().execute();
        break;
      case LOCIZE_GET:
        await new LocizeGetAction().execute();
        break;
      case LOCIZE_GET_ALL:
        await new LocizeGetAllAction().execute();
        break;
      case LOCIZE_RELEASE:
        await new LocizeReleaseGroup().execute();
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
