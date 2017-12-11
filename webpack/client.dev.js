require('dotenv').config()
const { resolve } = require('path')
const {
    HotModuleReplacementPlugin,
    NamedModulesPlugin,
} = require('webpack')

const { Dir, PP } = require('../config.js')

const CLIENT_PORT = process.env.CLIENT_PORT || 8081
const API_PORT = process.env.API_PORT || 8080

module.exports = {
    entry: {
        bundle: [
            'babel-polyfill',
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://localhost:${CLIENT_PORT}`,
            'webpack/hot/only-dev-server',
            resolve(Dir.client, 'js', 'index.jsx'),
        ],
    },
    target: 'web',
    output: {
        publicPath: `http://localhost:${CLIENT_PORT}${PP}`,
        filename: 'js/[name].js',
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
                            ['env', { modules: false }],
                            'react',
                            'stage-0',
                        ],
                        plugins: [
                            'react-hot-loader/babel',
                        ],
                    },
                }],
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }, {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 40000,
                        name: '[path][name].[ext]',
                    },
                }],
            },
        ],
    },
    plugins: [
        new NamedModulesPlugin(),
        new HotModuleReplacementPlugin(),
    ],
    devServer: {
        host: 'localhost',
        port: CLIENT_PORT,
        hot: true,
        contentBase: Dir.dist,
        historyApiFallback: true,
        proxy: {
            '/api/**': {
                target: `http://localhost:${API_PORT}`,
                pathRewrite: { '^/api': '' },
                changeOrigin: true,
                secure: false,
            },
        },
    },
    devtool: 'inline-source-map',
}
