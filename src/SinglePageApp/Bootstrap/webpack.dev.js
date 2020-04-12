const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: "development",
    devtool: 'inline-source-map',
    entry: path.resolve(__dirname, './entry.dev.js'),
    devServer: {
        historyApiFallback: true,
        contentBase: './dist/SinglePageApp',
        compress: true,
        port: 9000,
        hot: true
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
});
