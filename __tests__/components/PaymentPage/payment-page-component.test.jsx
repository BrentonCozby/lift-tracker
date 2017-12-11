import React from 'react'
import 'raf/polyfill'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configStore from '../../../client/js/store.js'
import ConnectedPaymentPage, { PaymentPage } from '../../../client/js/components/PaymentPage/payment-page-component.jsx'

Enzyme.configure({ adapter: new EnzymeAdapter() })

jest.mock('../../../client/js/components/PaymentPage/PaymentPageForm/payment-page-form-component.jsx', () => function Form() {
    return <div className="PaymentForm"></div>
})
jest.mock('react-stripe-elements', () => {
    return {
        Elements() {
            return <div className="Elements"></div>
        }
    }
})

describe('PaymentPage', () => {
    let initialState
    let initialProps
    let store

    function initializeComponent(props) {
        const $component = shallow(<PaymentPage {...props} />)

        const componentTree = renderer.create(
            <Router>
                <PaymentPage {...props} />
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
                    <ConnectedPaymentPage {...props} />
                </Router>
            </Provider>
        )

        const componentTree = renderer.create(
            <Provider store={store}>
                <Router>
                    <ConnectedPaymentPage {...props} />
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
        initialProps = {}
    })

    test('renders payment page', () => {
        const { componentJSON } = initializeComponent(initialProps)

        expect(componentJSON).toMatchSnapshot()
    })

    test('renders payment page (connected)', () => {
        initialState = {}

        const { componentJSON } = initializeConnectedComponent(initialProps, initialState)

        expect(componentJSON).toMatchSnapshot()
    })
})