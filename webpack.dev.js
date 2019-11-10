const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: "development",
    entry: path.resolve(__dirname, './entry.dev.js'),
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 9000,
        hot: true
    }
});
