const path = require('path');

module.exports = {
    entry: "./app/entry",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js",
        publicPath: "/assets/", // string
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                options: {
                    presets: ["es2015"]
                },
            },
        ]
    }
};
