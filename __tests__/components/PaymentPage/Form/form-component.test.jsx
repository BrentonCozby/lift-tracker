import React from 'react'
import 'raf/polyfill'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configStore from '../../../../src/js/store.js'
import ConnectedForm, { Form } from '../../../../src/js/components/PaymentPage/Form/form-component.jsx'

Enzyme.configure({ adapter: new EnzymeAdapter() })

jest.mock('react-stripe-elements', () => {
    return {
        CardElement() {
            return <div className="CardElement"></div>
        },
        injectStripe(component) {
            return component
        }
    }
})

describe('Form', () => {
    let initialState
    let initialProps
    let store
    let createTokenSpy

    function initializeComponent(props) {
        const $component = shallow(<Form {...props} />)

        const componentTree = renderer.create(
            <Router>
                <Form {...props} />
            </Router>
        )

        return {
            props,
            $component,
            componentTree,
            componentJSON: componentTree.toJSON()
        }
    }

    function initializeConnectedComponent(props, state) {
        store = configStore(state)

        const $component = mount(
            <Provider store={store}>
                <Router>
                    <ConnectedForm {...props} />
                </Router>
            </Provider>
        )

        const componentTree = renderer.create(
            <Provider store={store}>
                <Router>
                    <ConnectedForm {...props} />
                </Router>
            </Provider>
        )

        return {
            props,
            $component,
            componentTree,
            componentJSON: componentTree.toJSON()
        }
    }

    beforeEach(() => {
        createTokenSpy = jest.fn(() => {
            return Promise.resolve({
                token: 'token'
            })
        })

        initialProps = {
            stripe: {
                createToken: createTokenSpy
            }
        }
    })

    test('renders payment form', () => {
        const { componentJSON } = initializeComponent(initialProps)

        expect(componentJSON).toMatchSnapshot()
    })

    test('creates a stripe token when the form is submitted', () => {
        const instance = initializeComponent(initialProps).$component.instance()

        instance.handleSubmit({
            preventDefault: () => {}
        })

        expect(createTokenSpy).toHaveBeenCalledWith({ type: 'card', name: 'Test User' })
    })

    test('renders payment form (connected)', () => {
        initialState = {}

        const { componentJSON } = initializeConnectedComponent(initialProps, initialState)

        expect(componentJSON).toMatchSnapshot()
    })
})