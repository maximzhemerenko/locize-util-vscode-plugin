import {TextEditor, window, workspace} from "vscode";

export const getActiveEditor = () => window.activeTextEditor;

export const getEditorFilePath = (editor: TextEditor) => editor.document.uri.fsPath;

export const getWorkspaceRoot = () => workspace.workspaceFolders?.at(0)?.uri.fsPath;

export const saveAllWorkspaceFiles = () => workspace.saveAll().then(saved => {
  if (!saved) {
    throw new Error("Not saved");
  }
});
