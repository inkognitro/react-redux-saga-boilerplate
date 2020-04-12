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
            Common: path.resolve(__dirname, './src/Common'),
            SinglePageApp: path.resolve(__dirname, './src/SinglePageApp'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin()
    ]
};
