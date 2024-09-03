import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

export default {
    entry: {
        background: path.resolve(import.meta.dirname, '../src/background/background.ts'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(import.meta.dirname, '../dist'),
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.ts?$/,
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(import.meta.dirname, '../src/static'),
                    to: path.resolve(import.meta.dirname, '../dist'),
                },
            ],
        }),
    ],
};
