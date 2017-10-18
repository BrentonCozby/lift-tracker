import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import configStore from './store.js'
import App from './components/app-component.jsx'

describe('app-component', () => {
    it('renders App with router and store without crashing', () => {
        const reactStripeElements = jest.genMockFromModule('react-stripe-elements')

        reactStripeElements.StripeProvider = jest.fn()

        const div = document.createElement('div')
        const store = configStore()
        
        ReactDOM.render(
            <Provider store={store}>
                <Router>
                    <Route path={PP} component={App} />
                </Router>
            </Provider>,
            div
        )
    })
})