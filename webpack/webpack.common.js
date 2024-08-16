const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const production = process.env.NODE_ENV === 'production';

const config = {
	entry: {
		background: path.resolve("./src/background/background.ts"),
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "[name].js",
		clean: true,
	},
	module: {
		rules: [
			{
				use: "ts-loader",
				test: /\.tsx?$/,
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve("src/static"),
					to: path.resolve("dist"),
				}
			],
		}),
	],
	devServer: {
        static: path.join(__dirname, 'dist'),
        port: 3000,
    },
};
// TODO
if (production) {
	config.optimization = {
		minimize: production,
		minimizer: [
			new EsbuildPlugin({
				target: 'es2015',
				css: true,
			}),
		],
	};
}

module.exports = config;