import {OutputChannel, window} from "vscode";
import {exec} from "node:child_process";
import {getWorkspaceRoot} from "./pluginUtils";

let currentOutputChannel: OutputChannel | undefined;
let currentScriptRuner: ScriptRunner | undefined;

const getOutputChannel = () => {
  let outputChannel: OutputChannel;

  if (!currentOutputChannel) {
    outputChannel = window.createOutputChannel("Locize");
    currentOutputChannel = outputChannel;
  } else {
    outputChannel = currentOutputChannel;
  }

  return outputChannel;
};

const createScriptRunner = (command: string[], outputChannel: OutputChannel) => {
  currentScriptRuner?.setOutputChannel(undefined);

  const scriptRunner = new ScriptRunner(command);
  currentScriptRuner = scriptRunner;

  scriptRunner.setOutputChannel(outputChannel);

  return scriptRunner;
};

class ScriptRunner {
  constructor(private readonly command: string[]) {}

  private outputChannel: OutputChannel | undefined;

  setOutputChannel(outputChannel: OutputChannel | undefined) {
    this.outputChannel = outputChannel;
  }

  run() {
    return new Promise<void>((resolve, reject) => {
      const command = this.command.join(' ');

      this.outputChannel?.appendLine(`> ${command}`);

      const shellCommand  = `/bin/zsh -li -c "${command}"`;

      const process = exec(shellCommand, {cwd: getWorkspaceRoot()}, (error, _, stderr) => {
        if (error) {
          this.outputChannel?.append(`Error: ${stderr || error.message}`);

          reject(error);
          return;
        }

        this.outputChannel?.append("\nDone\n");

        resolve();
      });

      process.stdout?.on("data", data => this.outputChannel?.append(data.toString()));
      process.stderr?.on("data", data => this.outputChannel?.append(data.toString()));
    });
  }
}

class ShellScript {
  run(command: string[]) {
      const outputChannel = getOutputChannel();
      const scriptRunner = createScriptRunner(command, outputChannel);

      outputChannel.clear();
      outputChannel.show(true);

      return scriptRunner.run();
  }
}

const shellScript = new ShellScript();

export {shellScript as ShellScript};
