const path = require('path');

const extraNodeModules = {
  'mobile-app': path.resolve(__dirname + './src'),
  'packages': path.resolve(__dirname + '/../packages/src'),
};

const config = {
  watchFolders: [
    path.resolve(__dirname, '../packages/src'),
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
