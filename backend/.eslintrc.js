module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": "airbnb-base",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    semi: ['error', 'always'],
    'no-console': 0,
    'max-len': ['error', { code: 100 }],
    }
}
