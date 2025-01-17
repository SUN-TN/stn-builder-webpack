const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');
const path = require('path');

const projectRoot = process.cwd();

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name]_[chunkhash:8].js',
        path: path.join(projectRoot, 'dist')
    },
    devtool: 'none',
    plugins: [
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /(react|react-dom)/,
                    name: 'vendors',
                    chunks: 'all',
                },
                commons: {
                    minChunks: 2,
                    name: 'commons',
                    chunks: 'all',
                },
            },
        },
    },
};
module.exports = merge(baseConfig, prodConfig);
