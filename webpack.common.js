const path = require('path');

module.exports = {
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
    },
    resolve: {
        alias: {
            App: path.resolve(__dirname, 'src/'),
        },
        extensions: ['.js', '.jsx'],
    }
};
