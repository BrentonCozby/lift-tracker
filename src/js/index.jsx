import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AppContainer as ReactHotLoader } from 'react-hot-loader'

import { PP } from '../../config.js'
import configStore from './store.js'
import AppContainer from './containers/AppContainer.jsx'
import '../scss/index.scss'

// import views so they can live-reload during development
if (process.env.NODE_ENV === 'development') {
    // pages
    require('../views/pages/index.pug')

    // partials
    require('../views/layout.pug')
    require('../views/partials/head.pug')
}

const store = configStore()

const render = (Component) => {
    if(process.env.NODE_ENV === 'development') {
        ReactDOM.render(
            <ReactHotLoader>
                <Provider store={store}>
                    <Router>
                        <Route path={PP} component={Component} />
                    </Router>
                </Provider>
            </ReactHotLoader>,
        document.getElementById('root'))
    } else {
        ReactDOM.render(
            <Provider store={store}>
                <Router>
                    <Route path={PP} component={Component} />
                </Router>
            </Provider>,
        document.getElementById('root'))
    }
}

render(AppContainer)

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./containers/AppContainer.jsx', () => {
        const nextApp = require('./containers/AppContainer.jsx').default
        render(nextApp)
    })
}
