const swPrecache = require('sw-precache')
const { Dir, SITE_NAME } = require('./config.js')
const { resolve } = require('path')

swPrecache.write(resolve(Dir.dist, 'client', 'service-worker.js'), {
    cacheId: SITE_NAME,
    filename: 'service-worker.js',
    stripPrefix: Dir.dist,
    staticFileGlobs: [
        `${Dir.dist}/**/*.{html,js,json,css,xml,txt,png,jpg,gif,svg,eot,ttf,woff}`
    ],
    dontCacheBustUrlsMatching: [
        /\.(js|json|css)$/, // I'm cache busting these files myself
    ],
    skipWaiting: true,
}, (err) => {
    if (err) {
        throw new Error(err)
    }
})
