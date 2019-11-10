const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/entry.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "app.js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
            },
        ]
    }
};
