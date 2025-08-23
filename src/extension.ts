import {window, ExtensionContext} from 'vscode';
import {LocizeButtonGroup} from "./actions";
import {registerLocizeButtonGroupCommand, getActiveEditor} from "./core";
import {Config} from "./core";

export function activate(context: ExtensionContext) {
  Config.load();

  const locizeButtonGroup = new LocizeButtonGroup();

  context.subscriptions.push(registerLocizeButtonGroupCommand(() => {
    locizeButtonGroup.execute().then();
  }));

  locizeButtonGroup.onDidChangeActiveTextEditor(getActiveEditor()).then();

  window.onDidChangeActiveTextEditor(editor => {
    locizeButtonGroup.onDidChangeActiveTextEditor(editor).then();
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
