import { App } from "vue";
import { init as initLogger } from "./composables/logger";
import { init as initI18n } from "./composables/i18n";
import { init as initBlade } from "./composables/blade";

const init = [initLogger, initI18n, initBlade];

export default {
  install(app: App, options: Record<string, unknown>): void {
    // Init all children
    init.forEach((fn) => fn(app, options));
  },
};

export * from "./composables";
export * from "./types";
