const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: "development",
    devtool: 'inline-source-map',
    entry: path.resolve(__dirname, './src/SinglePageApp/entry.dev.js'),
    devServer: {
        historyApiFallback: true,
        contentBase: './dist',
        compress: true,
        port: 9000,
        hot: true
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    "plugins": [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
});
