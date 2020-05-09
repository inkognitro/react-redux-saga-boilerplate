/* eslint-disable */
const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: "production",
    entry: path.resolve(__dirname, './entry.prod.jsx')
});
