module.exports = {
  webpack(config) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };
    config.resolve.modules.push(__dirname);

    return config;
  },
};
