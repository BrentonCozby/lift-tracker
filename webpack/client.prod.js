const {
    optimize,
} = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ResourceHintsPlugin = require('resource-hints-webpack-plugin')
const FaviconsPlugin = require('favicons-webpack-plugin')
const { resolve } = require('path')

const { Dir, SITE_TITLE } = require('../config.js')

module.exports = {
    entry: {
        vendor: [
            'babel-polyfill',
            'raf/polyfill',
            'whatwg-fetch',
            'es6-promise/auto',
            'react',
            'classnames',
            'react-dom',
            'react-redux',
            'react-router-dom',
            'react-router-redux',
            'redux',
            'redux-promise',
            'redux-thunk',
        ],
        bundle: [
            resolve(Dir.client, 'js', 'index.jsx'),
        ],
    },
    output: {
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', { modules: false }],
                            'react',
                            'stage-0',
                        ],
                    },
                }],
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader', {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [require('autoprefixer')({ browsers: ['> 1%'] })],
                            },
                        },
                        'sass-loader',
                    ],
                }),
            }, {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40000,
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new FaviconsPlugin({
            logo: resolve(Dir.images, 'react-logo.png'),
            background: '#333',
            title: SITE_TITLE,
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: true,
                twitter: true,
                yandex: false,
                windows: true,
            },
        }),
        new ExtractTextPlugin('css/style.[chunkhash].css'),
        new optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),
        new optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity,
        }),
        new ResourceHintsPlugin(),
    ],
}
