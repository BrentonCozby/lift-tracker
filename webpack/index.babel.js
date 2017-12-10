import { resolve } from 'path'
import { DefinePlugin } from 'webpack'
import merge from 'webpack-merge'
import HtmlPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

import * as config from '../config.js'
import devConfig from './dev.js'
import prodConfig from './prod.js'
require('dotenv').config()

const TARGET = process.env.NODE_ENV
const env = (TARGET === 'development') ? 'dev' : 'prod'

let common = {
    output: {
        path: config.Dir.dist,
        publicPath: config.PP
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        name: '[path][name].[ext]'
                    }
                }
            }, {
                test: /\.(pug)$/,
                use: ['pug-loader']
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            filename: 'index.html',
            template: resolve(config.Dir.views, 'pages', 'index.pug'),
            ...config,
            env: process.env.NODE_ENV
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            PP: JSON.stringify(config.PP),
            SITE_TITLE: JSON.stringify(config.SITE_TITLE),
            SITE_NAME: JSON.stringify(config.SITE_NAME),
            DESCRIPTION: JSON.stringify(config.DESCRIPTION),
            SITE_URL: JSON.stringify(config.SITE_URL),
            SITE_IMAGE: JSON.stringify(config.SITE_IMAGE),
            DEVELOPER_NAME: JSON.stringify(config.DEVELOPER_NAME),
            DEVELOPER_URL: JSON.stringify(config.DEVELOPER_URL),
            GOOGLE_ANALYTICS_ID: JSON.stringify(config.GOOGLE_ANALYTICS_ID),
            DEV_PATH: JSON.stringify(config.DEV_PATH)
        }),
        new CopyPlugin([
            { from: config.Dir.static, to: config.Dir.dist }
        ])
    ],
    resolve: {
        modules: [
            config.Dir.src,
            'node_modules'
        ],
        alias: {
            images: config.Dir.images,
            components: resolve(config.Dir.js, 'components'),
            'actions-and-reducers': resolve(config.Dir.js, 'actions-and-reducers'),
            programs: resolve(config.Dir.js, 'programs')
        }
    }
}

let webpackConfig

if (env === 'dev') {
    webpackConfig = merge(common, devConfig)
}

if (env === 'prod') {
    webpackConfig = merge(common, prodConfig)
}

export default webpackConfig
