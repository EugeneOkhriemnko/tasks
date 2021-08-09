/* eslint-disable */
const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0

module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('define')
      .tap(args => {
        let _base = args[0]["process.env"];
        args[0]["process.env"] = {
          ..._base,
          "PACKAGE_VERSION": `"${version}"`,
          "PLATFORM_URL": `${process.env.PLATFORM_URL}`
        };
        return args;
       });
  },
};
