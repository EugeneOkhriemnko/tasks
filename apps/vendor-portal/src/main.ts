import { createApp, resolveComponent, h } from "vue";
import { VueSignalR } from "@quangdao/vue-signalr";
import VirtoShellUi from "@virtoshell/ui";
import VirtoShellCore from "@virtoshell/core";
import ModAssets from "@virtoshell/mod-assets";
import ModOrders from "./modules/orders";
import ModProducts from "./modules/products";
import ModOffers from "./modules/offers";
import ModImport from "./modules/import";
import ModSettings from "./modules/settings";
import router from "./router";

import * as locales from "./locales";

// Load required CSS
import "@fortawesome/fontawesome-free/css/all.min.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";

const app = createApp({
  render: () => h(resolveComponent("router-view")),
})
  .use(VueSignalR, {
    url: "/pushNotificationHub",
  })
  .use(VirtoShellUi)
  .use(VirtoShellCore)
  .use(ModAssets)
  .use(ModOrders)
  .use(ModProducts)
  .use(ModOffers)
  .use(ModImport)
  .use(ModSettings);

Object.entries(locales).forEach(([key, message]) => {
  app.config.globalProperties.$mergeLocaleMessage(key, message);
});

app.use(router);

app.mount("#app");
