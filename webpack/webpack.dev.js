import {merge} from 'webpack-merge';
import common from './webpack.common.js';

const config = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
});

export default config;