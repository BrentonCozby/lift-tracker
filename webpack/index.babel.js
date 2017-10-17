import { resolve } from 'path'
import { DefinePlugin } from 'webpack'
import merge from 'webpack-merge'
import HtmlPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

import { Dir, PP, SITE_TITLE, DESCRIPTION, SITE_URL } from '../config.js'
import devConfig from './dev.js'
import prodConfig from './prod.js'

const TARGET = process.env.npm_lifecycle_event
const env = (TARGET === 'dev') ? 'dev' : 'prod'

let common = {
    output: {
        path: Dir.dist,
        publicPath: PP
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
            template: resolve(Dir.views, 'pages', 'index.pug'),
            SITE_TITLE,
            DESCRIPTION,
            SITE_URL
        }),
        new DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'perishable_key': JSON.stringify(process.env.perishable_key)
            },
            PP: JSON.stringify(PP)
        }),
        new CopyPlugin([
            { from: resolve(Dir.src, 'humans.txt') },
            { from: resolve(Dir.src, 'robots.txt') },
            { from: resolve(Dir.src, '.htaccess') }
        ])
    ],
    resolve: {
        modules: [
            Dir.src,
            'node_modules'
        ]
    }
}

let config

if (env === 'dev') {
    config = merge(common, devConfig)
}

if (env === 'prod') {
    config = merge(common, prodConfig)
}

export default config
