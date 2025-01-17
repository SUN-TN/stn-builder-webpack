const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const path = require('path');
const autoprefixer = require('autoprefixer');

const projectRoot = process.cwd();

const getMAP = () => {
    const entry = {};
    const htmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(projectRoot, './src/pages/*/index.js'));
    entryFiles.forEach((filePath) => {
        const match = filePath.match(/src\/pages\/(.*)\/index\.js/);
        const pageName = match && match[1];
        entry[pageName] = filePath;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                inlineCSS: true,
                template: path.join(projectRoot, `src/pages/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: ['commons', 'vendors', pageName],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false,
                },

            }),
        );
    });

    return {
        entry,
        htmlWebpackPlugins,
    };
};

const { entry, htmlWebpackPlugins } = getMAP();

module.exports = {
    entry,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                // use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.(less|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75, // 1rem = 75px
                            remPrecision: 8, // px转换为rem后的小数位数
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    browsers: ['last 2 version', '>1%', 'ios 7'],
                                }),
                            ],
                        },
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]',
                        limit: 1024 * 5, // 小于1024 * n字节，使用base64编码
                    },
                }],
            }, {
                test: /\.(woff|ttf|woff2|eot|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]',
                    },
                }],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(), // 清理dist目录
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        new FriendlyErrorsWebpackPlugin(),
        function errorPlugin() {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
                    // eslint-disable-next-line
                    console.log('build error');
                    process.exit(1);
                } else {
                    // eslint-disable-next-line
                    console.log('build success');
                }
            });
        },
        ...htmlWebpackPlugins,
    ],
};
