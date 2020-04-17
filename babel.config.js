module.exports = {
    "presets": [
        ["@babel/preset-env", {
            "useBuiltIns": "usage",
            "corejs": 3
        }],
        "@babel/preset-react",
        "@babel/preset-typescript"
    ],
    "plugins": [
        "@babel/plugin-transform-regenerator",
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread"
    ]
};