/* eslint-disable */
const path = require('path');
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
    plugins: [
        new ForkTsCheckerWebpackPlugin()
    ]
};
