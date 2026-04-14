import {Release, TranslationUtil} from "../core";

interface LocizePublishActionOptions {
  release: Release;
}

export class LocizePublishAction {
  constructor(private readonly options: LocizePublishActionOptions) {}

  async execute() {
    await TranslationUtil.run("publish", {release: this.options.release});
  }
}
