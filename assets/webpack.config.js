var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    target: "web",
    entry: [`${path.resolve(__dirname, 'src')}/index.js`],
    output: {
        path: path.resolve(__dirname, '../app/static/js'),
        publicPath: '/app/static/js',
        filename: '[name].js'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleTracker({
            path: __dirname,
            filename: 'webpack-stats.json'
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        compress: true,
        hot: true,
        port: 9000,
        watchContentBase: true,
        compress: true,
        writeToDisk: true
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]",
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            minimize: true,
                            outputPath: path.resolve(__dirname, '../app/static/css'), name: '[name].min.css'
                        }
                    }
                ]
            }
        ],
    },
}