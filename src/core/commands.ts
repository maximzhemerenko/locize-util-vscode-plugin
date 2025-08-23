import vscode from "vscode";

export const registerLocizeButtonGroupCommand = (action: () => void) =>
  vscode.commands.registerCommand('translationutil.locizeButtonGroup', action);

export const setIsLocizeButtonVisible = (isVisible: boolean) =>
  vscode.commands.executeCommand('setContext', 'translationutil.isLocizeButtonGroupVisible', isVisible);
