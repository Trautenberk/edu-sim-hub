const { addBeforeLoader, loaderByName } = require('@craco/craco');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const wasmExtensionRegExp = /\.wasm$/;
      webpackConfig.resolve.extensions.push('.wasm');

      const mjsExtensionRegExp = /\/mjs$/;
      webpackConfig.resolve.extensions.push('.mjs');
      

      webpackConfig.module.rules.forEach((rule) => {
        (rule.oneOf || []).forEach((oneOf) => {
          if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
            oneOf.exclude.push(wasmExtensionRegExp);
          }
        });
      });

      const mjsLoader = {
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto"}

      const wasmLoader = {
        test: /\.wasm$/,
        exclude: /node_modules/,
        loaders: ['wasm-loader'],
      };

      addBeforeLoader(webpackConfig, loaderByName('file-loader'), wasmLoader);
      addBeforeLoader(webpackConfig,loaderByName("file-loader"), mjsLoader);

      return webpackConfig;
    },
  },
};