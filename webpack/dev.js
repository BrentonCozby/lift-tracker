import { resolve } from 'path'
import {
    HotModuleReplacementPlugin,
    NamedModulesPlugin
} from 'webpack'

import { Dir, rootUrl } from '../config.js'

export default {
    entry: {
        bundle: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            'babel-polyfill',
            resolve(Dir.src, 'js', 'index.jsx')
        ]
    },
    output: {
        filename: 'js/[name].js'
    },
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
                        ],
                        plugins: [
                            'react-hot-loader/babel'
                        ]
                    }
                }]
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }, {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 40000,
                        name: '[path][name].[ext]',
                    }
                }]
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin()
    ],
    devServer : {
        hot: true,
        contentBase: Dir.dist,
        publicPath: rootUrl,
        historyApiFallback: true
    },
    devtool: 'eval'
}
