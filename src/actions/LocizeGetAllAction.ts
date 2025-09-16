import {Release, TranslationUtil} from "../core";

interface LocizeGetAllActionOptions {
  release?: Release;
}

export class LocizeGetAllAction {
  constructor(private readonly options?: LocizeGetAllActionOptions) {}

  async execute() {
    await TranslationUtil.run("get", {release: this.options?.release});
  }
}
