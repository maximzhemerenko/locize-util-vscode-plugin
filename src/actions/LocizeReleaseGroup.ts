import {QuickPickItem, QuickPickItemKind, TextEditor, window} from "vscode";
import {getTranslationFileType, setIsLocizeButtonVisible, getRelease, Release} from "../core";
import {LocizeGetAllAction} from "./LocizeGetAllAction";
import {LocizeDevSyncAction} from "./LocizeDevSyncAction";
import {LocizePublishAction} from "./LocizePublishAction";

type PickItem = QuickPickItem & ({
  type: 'getAll' | 'devSync' | 'publish';
  release: Release;
} | {
  kind: QuickPickItemKind.Separator,
});

export class LocizeReleaseGroup {
  async execute() {
    const actions: PickItem[] = [];

    const release = getRelease();

    actions.push({
      label: release.version,
      kind: QuickPickItemKind.Separator,
    });

    actions.push({
      label: "GET ALL",
      type: "getAll",
      release,
    });

    actions.push({
      label: "DEV SYNC",
      type: "devSync",
      release,
    });

    actions.push({
      label: "",
      kind: QuickPickItemKind.Separator,
    });

    actions.push({
      label: 'PUBLISH',
      type: "publish",
      release,
    });

    const choice = await window.showQuickPick(
      actions,
      {placeHolder: 'Select action'}
    );

    if (!choice || !("type" in choice)) {
      return;
    }

    switch (choice.type) {
      case "getAll": {
        await new LocizeGetAllAction({release: choice.release}).execute();
        break;
      }
      case "devSync": {
        await new LocizeDevSyncAction({release: choice.release}).execute();
        break;
      }
      case "publish": {
        await new LocizePublishAction({release: choice.release}).execute();
        break;
      }
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
