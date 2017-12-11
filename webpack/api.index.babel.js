require('dotenv').config()
const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')

const config = {
    entry: [
        path.join(__dirname, '..', 'api', 'index.js'),
    ],
    target: 'node',
    externals: [nodeExternals({})],
    module: {
        rules: [{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        }],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'BUILD_TARGET': JSON.stringify('api'),
                'isDev': JSON.stringify(['dev', 'dev:api'].indexOf(process.env.npm_lifecycle_event) > -1),
                'SECRET_KEY': JSON.stringify(process.env.SECRET_KEY),
            },
        }),
    ],
    output: {
        path: path.join(__dirname, '..', 'dist', 'api'),
        filename: 'api.bundle.js',
    },
}

if (['dev', 'dev:api'].indexOf(process.env.npm_lifecycle_event) > -1) {
    config.entry.unshift('webpack/hot/poll?1000')

    config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
    config.plugins.unshift(new StartServerPlugin('api.bundle.js'))

    config.watch = true

    config.externals = [nodeExternals({
        whitelist: ['webpack/hot/poll?1000'],
    })]
}

module.exports = config