module.exports = {
    "extends": "./node_modules/@eleks/eslint-config-eleks/base.js",
    "env": {
        "node": true,
        "browser": false,
        "es6": true
    },
    "rules": {
        "no-var": 2,
        "one-var": [2, {
            "uninitialized": "always",
            "initialized": "never"
        }]
    }
};