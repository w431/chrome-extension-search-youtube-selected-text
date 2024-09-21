import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    {
        ignores: ['dist/*', 'src/**/*.js'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    prettierConfig,
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'error',
            'padding-line-between-statements': ['error', { blankLine: 'always', prev: 'function', next: 'function' }],
        },
    },
];
