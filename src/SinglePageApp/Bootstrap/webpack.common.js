const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfiguration = require('../../../webpack.base');

module.exports = merge(baseConfiguration, {
    output: {
        path: path.resolve(__dirname, '../../../dist/SinglePageApp'),
        filename: "app.js",
        publicPath: "/"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/SinglePageApp/index.html',
        }),
    ]
});
