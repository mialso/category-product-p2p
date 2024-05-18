module.exports = {
    extends: [
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'react/function-component-definition': ['error', {
            'namedComponents': 'arrow-function',
        }],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type']
    },
};
