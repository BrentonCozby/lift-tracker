import {
    HashedModuleIdsPlugin,
    optimize
} from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ChunkManifestPlugin from "chunk-manifest-webpack-plugin"
import WebpackChunkHash from "webpack-chunk-hash"
import ResourceHintsPlugin from 'resource-hints-webpack-plugin'
import FaviconsPlugin from 'favicons-webpack-plugin'
import { resolve } from 'path'

import { Dir, rootUrl, title } from '../config.js'

export default {
    entry: {
        vendor: [
            'react',
            'classnames',
            'react-dom',
            'react-redux',
            'react-router-dom',
            'redux',
            'redux-promise',
            'redux-thunk'
        ],
        bundle: [
            'babel-polyfill',
            resolve(Dir.src, 'js', 'index.jsx')
        ]
    },
    output: {
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js'
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
                            ['env', {modules: false}],
                            'react',
                            'stage-0'
                        ]
                    }
                }]
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader', {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [require('autoprefixer')({browsers: ['> 1%']})]
                            }
                        },
                        'sass-loader'
                    ]
                })
            }, {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40000,
                            name: '[path][name].[ext]'
                        }
                    }, {
                        loader: 'image-webpack-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [
	new FaviconsPlugin({
            logo: resolve(Dir.images, 'react-logo.png'),
            background: '#333',
            title: title,
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
                windows: true
            }
        }),
        new ExtractTextPlugin('css/style.[chunkhash].css'),
        new optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new ChunkManifestPlugin({
            filename: "chunk-manifest.json",
            manifestVariable: "webpackManifest"
        }),
        new ResourceHintsPlugin(),
        new HashedModuleIdsPlugin(),
        new WebpackChunkHash()
    ]
}
