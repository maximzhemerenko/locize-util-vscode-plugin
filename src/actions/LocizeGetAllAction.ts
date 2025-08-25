import {TranslationUtil} from "../core";

export class LocizeGetAllAction {
  async execute() {
    await TranslationUtil.run("dev");
  }
}
