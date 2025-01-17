const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

const projectRoot = process.cwd();

const ssrConfig = {
    mode: 'production',
    output: {
        filename: '[name]-server.js',
        path: path.join(projectRoot, 'dist'),
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: 'ignoer-loader',
            },
        ],
    },
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

module.exports = merge(baseConfig, ssrConfig);
