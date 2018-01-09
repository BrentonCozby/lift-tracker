const { resolve } = require('path')

// Use the following variables in src/views. They are made available in
// build-tools/ejs-to-html.js in the 'transformer' function

// PP (public path) must begin and end with '/' unless it is just '/'
module.exports.PP = ['dev', 'dev:api', 'dev:client'].indexOf(process.npm_lifecycle_event) > -1
    ? '/'
    : '/'
module.exports.SITE_TITLE = 'Lift Tracker'
module.exports.SITE_NAME = 'lift-tracker'
module.exports.DESCRIPTION = 'Track your workout progress with ease.'
module.exports.SITE_URL = 'https://d3cbqu8s5ha2bg.cloudfront.net/'
module.exports.SITE_IMAGE = ''
module.exports.DEVELOPER_NAME = 'Brenton Cozby'
module.exports.DEVELOPER_URL = 'https://brentoncozby.com'
module.exports.GOOGLE_ANALYTICS_ID = ''
module.exports.DEV_PATH = __dirname

module.exports.Dir = {
    dist: resolve(__dirname, 'dist'),
    client: resolve(__dirname, 'client'),
    api: resolve(__dirname, 'api'),
    css: resolve(__dirname, 'client', 'css'),
    js: resolve(__dirname, 'client', 'js'),
    static: resolve(__dirname, 'client', 'static'),
    images: resolve(__dirname, 'client', 'static', 'images'),
    views: resolve(__dirname, 'client', 'views'),
    pages: resolve(__dirname, 'client', 'views', 'pages'),
    partials: resolve(__dirname, 'client', 'views', 'partials'),
}