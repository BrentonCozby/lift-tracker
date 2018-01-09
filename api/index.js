require('dotenv').config()
import http from 'http'
import app from './app.js'

const server = http.createServer(app)
let currentApp = app
const PORT = process.env.API_PORT || 8080

server.listen(PORT)

if (module.hot) {
    module.hot.accept('./app.js', () => {
        server.removeListener('request', currentApp)
        server.on('request', app)
        currentApp = app
    })
}
