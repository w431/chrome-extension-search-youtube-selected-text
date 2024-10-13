import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import json from 'eslint-plugin-json';

export default [
    {
        ignores: [
            'dist/*',
            'src/**/*.js',
        ],
    },
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    stylistic.configs['all-flat'],
    {
        plugins: {
            '@stylistic': stylistic,
            json: json,
        },
        rules: {
            '@stylistic/quotes': [
                'error',
                'single',
            ],
            '@stylistic/quote-props': [
                'error',
                'as-needed',
            ],
            '@stylistic/comma-dangle': [
                'error',
                {
                    arrays: 'always-multiline',
                    objects: 'always-multiline',
                    imports: 'always-multiline',
                    exports: 'always-multiline',
                    functions: 'always-multiline',
                },
            ],
            '@stylistic/padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: 'import',
                    next: '*',
                },
                {
                    blankLine: 'any',
                    prev: 'import',
                    next: 'import',
                },
            ],
            '@stylistic/object-curly-spacing': [
                'error',
                'always',
            ],
            '@stylistic/object-curly-newline': [
                'error',
                {
                    ObjectExpression: {
                        minProperties: 4,
                        multiline: true,
                        consistent: true,
                    },
                    ObjectPattern: {
                        minProperties: 4,
                        multiline: true,
                        consistent: true,
                    },
                    ImportDeclaration: {
                        minProperties: 4,
                        multiline: true,
                        consistent: true,
                    },
                    ExportDeclaration: {
                        minProperties: 4,
                        multiline: true,
                        consistent: true,
                    },
                },
            ],
            '@stylistic/brace-style': [
                'error',
                '1tbs',
                { allowSingleLine: true },
            ],
            '@stylistic/function-call-argument-newline': [
                'error',
                'consistent',
            ],
            '@stylistic/no-multiple-empty-lines': [
                'error',
                { max: 1 },
            ],
            '@stylistic/max-len': [
                'error',
                {
                    code: 120,
                    ignoreUrls: true,
                    ignoreComments: true,
                    ignoreRegExpLiterals: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                },
            ],
        },
    },
    {
        files: ['**/*.json'],
        ignores: ['dist/*'],
        ...json.configs['recommended'],
    },
];
