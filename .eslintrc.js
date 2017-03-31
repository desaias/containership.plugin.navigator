module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
      "react",
      "jsx-a11y",
      "import"
    ],
    "rules": {
        "import/extensions": 0,
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-nested-ternary": 0,
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/forbid-prop-types": 0,
        "react/jsx-filename-extension": [
          2, { "extensions": [".js", ".jsx"] }
        ],
        "react/require-default-props": 0,
    }
};
