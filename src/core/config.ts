import {parse} from 'ini';
import {readFileSync} from "fs";
import {getWorkspaceRoot} from "./pluginUtils";

interface IData {
  translationsDirectory: string | undefined;
  defaultLanguage: string | undefined;
}

class Config {
  private _translationsDirectory : string | undefined;
  private _defaultLanguage : string | undefined;

  get translationsDirectory() {
    return this._translationsDirectory;
  }

  get defaultLanguage() {
    return this._defaultLanguage;
  }

  load() {
    const text = readFileSync(`${getWorkspaceRoot()}/.translations`, {
      encoding: 'utf-8',
    });

    const data = parse(text) as IData;

    this._translationsDirectory = data.translationsDirectory;
    this._defaultLanguage = data.defaultLanguage;
  }
}

const config = new Config();

export {config as Config};
