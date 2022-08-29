const path = require('path');

module.exports = {
  stories: [
    "../**/*.stories.mdx",
    "../**/*stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    'storybook-addon-next'
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5"
  },
  typescript: {
    reactDocgen: false
  },
  webpackFinal: async (config) => {
    config.resolve.modules.push(path.resolve(__dirname, '../'));

    const rules = config.module.rules;
    const fileLoaderRule = rules.find((rule) => rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;


    rules.unshift({
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          icon: true,
        },
      }],
    })

    return config
  },
};