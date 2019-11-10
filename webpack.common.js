const path = require('path');

module.exports = {
    entry: "./src/entry.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js",
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
