import {OutputChannel, window} from "vscode";
import {exec} from "node:child_process";
import {getWorkspaceRoot} from "./pluginUtils";

let currentOutputChannel: OutputChannel | undefined;

class ShellScript {
  run(...command: string[]) {
    return new Promise<void>((resolve, reject) => {
      if (currentOutputChannel) {
        currentOutputChannel.dispose();
      }

      const outputChannel = window.createOutputChannel("Locize");
      currentOutputChannel = outputChannel;

      outputChannel.appendLine(`> ${command.join(' ')}`);

      outputChannel.show(true);

      const process = exec(command.join(' '), {cwd: getWorkspaceRoot()}, (error, _, stderr) => {
        if (error) {
          outputChannel.append(`Error: ${stderr || error.message}`);

          reject(error);
          return;
        }

        outputChannel.append("\nDone\n");

        resolve();
      });

      process.stdout?.on("data", data => outputChannel.append(data.toString()));
      process.stderr?.on("data", data => outputChannel.append(data.toString()));
    });
  }
}

const shellScript = new ShellScript();

export {shellScript as ShellScript};
