import {Config} from "./config";
import {basename, extname} from "path";

export enum  TranslationFileType {
  Dev = "Dev",
  Other = "Other",
}

export const getTranslationFileType = (filePath: string): TranslationFileType | undefined => {
  const translationsDirectory = Config.translationsDirectory;

  if (!translationsDirectory || !filePath.endsWith('.json') || !filePath.includes(translationsDirectory)) {
    return undefined;
  }

  if (filePath.includes(`/${Config.defaultLanguage}/`)) {
    return TranslationFileType.Dev;
  }

  return TranslationFileType.Other;
};

export const getNamespace = (filePath: string) => basename(filePath, extname(filePath));
