/* eslint-disable */
const path = require("path");

module.exports = {
  productionSourceMap: false,

  configureWebpack: {
    // Fix for vue instance duplication: https://github.com/vuejs/vue-next/issues/2064#issuecomment-797365133
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve("./node_modules/vue")
      },
    },
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },
};
