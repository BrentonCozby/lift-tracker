import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import configStore from './store.js'
import App from './components/app-component.jsx'

describe('app-component', () => {
    let stripeMockFn
    let stripeMockResult

    beforeEach(() => {
        stripeMockResult = {
            elements: jest.fn(),
            createToken: jest.fn(),
            createSource: jest.fn(),
        }
        stripeMockFn = jest.fn().mockReturnValue(stripeMockResult)
        window.Stripe = stripeMockFn

        process.env.perishable_key = 'TEST'
    })
    
    test('renders App with router and store without crashing', () => {
        const store = configStore()
        const reactStripeElements = jest.genMockFromModule('react-stripe-elements')

        reactStripeElements.StripeProvider = jest.fn()

        const wrappedApp = renderer.create(
            <Provider store={store}>
                <Router>
                    <Route path={PP} component={App} />
                </Router>
            </Provider>
        )

        expect(wrappedApp.toJSON()).toMatchSnapshot()
    })
})