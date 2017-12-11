import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { StripeProvider } from 'react-stripe-elements'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AppContainer as ReactHotLoader } from 'react-hot-loader'

import configStore from './store.js'
import App from './components/app-component.jsx'
import '../scss/index.scss'

// import views so they can live-reload during development
if (process.env.NODE_ENV === 'development') {
    // pages
    require('../views/pages/index.pug')

    // partials
    require('../views/layout.pug')
    require('../views/partials/head.pug')
}

export const store = configStore()
const PUBLIC_STRIPE_API_KEY = process.env.NODE_ENV === 'development'
    ? 'pk_test_EoGExNoDDEaXgpne0NKt4x7F'
    : 'pk_live_PMELFEvTng3WDCk0LDtP21w6'

const render = (Component) => {
    if(process.env.NODE_ENV === 'development') {
        ReactDOM.render(
            <ReactHotLoader>
                <Provider store={store}>
                    <Router>
                        <StripeProvider apiKey={PUBLIC_STRIPE_API_KEY}>
                            <Route path={PP} component={Component} />
                        </StripeProvider>
                    </Router>
                </Provider>
            </ReactHotLoader>,
            document.getElementById('root'))
    } else {
        ReactDOM.render(
            <Provider store={store}>
                <Router>
                    <StripeProvider apiKey={PUBLIC_STRIPE_API_KEY}>
                        <Route path={PP} component={Component} />
                    </StripeProvider>
                </Router>
            </Provider>,
            document.getElementById('root'))
    }
}

render(App)

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/app-component.jsx', () => {
        const nextApp = require('./components/app-component.jsx').default
        render(nextApp)
    })
}
