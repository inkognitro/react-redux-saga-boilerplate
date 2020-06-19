const path = require('path');

const extraNodeModules = {
  'MobileApp': path.resolve(__dirname + './src'),
  'Packages': path.resolve(__dirname + '/../Packages/src'),
};

const config = {
  watchFolders: [
    path.resolve(__dirname, '../Packages/src'),
  ],
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) => {
        if (target[name]) {
          return target[name];
        }
        return path.join(__dirname, `node_modules/${name}`);
      }
    }),
  },
};

module.exports = config;
