/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
        ]
    },
    resolve: {
        alias: {
            Apps: path.resolve(__dirname, './src/Apps'),
            Packages: path.resolve(__dirname, './src/Packages'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    output: {
        path: path.resolve(__dirname, '../../../../dist/WebApp'),
        filename: "app.js",
        publicPath: "/",
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/Apps/WebApp/index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/Apps/WebApp/favicon.ico', to: './favicon.ico' },
            ],
        })
    ],
};
