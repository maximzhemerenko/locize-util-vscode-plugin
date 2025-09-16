import {QuickPickItem, QuickPickItemKind, TextEditor, window} from "vscode";
import {getTranslationFileType, setIsLocizeButtonVisible, getReleases, Release} from "../core";
import {LocizeGetAllAction} from "./LocizeGetAllAction";
import {LocizeDevSyncAction} from "./LocizeDevSyncAction";
import {LocizePublishAction} from "./publish";

type PickItem = QuickPickItem & ({
  type: 'getAll' | 'devSync' | 'publish';
  release: Release;
} | {
  type: 'publish';
} | {});

export class LocizeReleaseGroup {
  async execute() {
    const actions: PickItem[] = [];

    getReleases().forEach(release => {
      actions.push({
        label: `${release.product} [${release.version}]`,
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
    });

    actions.push({
      label: "",
      kind: QuickPickItemKind.Separator,
    });

    actions.push({
      label: 'PUBLISH...',
      type: "publish",
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
        await new LocizePublishAction().execute();
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
