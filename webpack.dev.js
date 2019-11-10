const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 9000
    }
});
