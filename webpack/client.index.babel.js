require('dotenv').config()

const { resolve } = require('path')
const { DefinePlugin } = require('webpack')
const merge = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const config = require('../config.js')
const devConfig = require('./client.dev.js')
const prodConfig = require('./client.prod.js')

const env = (['dev', 'dev:client'].indexOf(process.env.npm_lifecycle_event) > -1) ? 'development' : 'production'

let common = {
    output: {
        path: config.Dir.dist + '/client',
        publicPath: config.PP,
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        name: '[path][name].[ext]',
                    },
                },
            }, {
                test: /\.(pug)$/,
                use: ['pug-loader'],
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlPlugin({
            filename: 'index.html',
            template: resolve(config.Dir.views, 'pages', 'index.pug'),
            ...config,
            env,
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env),
            PP: JSON.stringify(config.PP),
            SITE_TITLE: JSON.stringify(config.SITE_TITLE),
            SITE_NAME: JSON.stringify(config.SITE_NAME),
            DESCRIPTION: JSON.stringify(config.DESCRIPTION),
            SITE_URL: JSON.stringify(config.SITE_URL),
            SITE_IMAGE: JSON.stringify(config.SITE_IMAGE),
            DEVELOPER_NAME: JSON.stringify(config.DEVELOPER_NAME),
            DEVELOPER_URL: JSON.stringify(config.DEVELOPER_URL),
            GOOGLE_ANALYTICS_ID: JSON.stringify(config.GOOGLE_ANALYTICS_ID),
            DEV_PATH: JSON.stringify(config.DEV_PATH),
        }),
        new CopyPlugin([
            { from: config.Dir.static, to: config.Dir.dist + '/client' },
        ]),
    ],
    resolve: {
        modules: [
            config.Dir.client,
            'node_modules',
        ],
        alias: {
            images: config.Dir.images,
            components: resolve(config.Dir.js, 'components'),
            'actions-and-reducers': resolve(config.Dir.js, 'actions-and-reducers'),
            programs: resolve(config.Dir.js, 'programs'),
        },
    },
}

let webpackConfig

if (env === 'development') {
    webpackConfig = merge(common, devConfig)
}

if (env === 'production') {
    webpackConfig = merge(common, prodConfig)
}

module.exports = webpackConfig
