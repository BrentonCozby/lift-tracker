import React from 'react'
import 'raf/polyfill'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configStore from '../../src/js/store.js'
import ConnectedApp, { App } from '../../src/js/components/app-component.jsx'

Enzyme.configure({ adapter: new EnzymeAdapter() })

jest.mock('../../src/js/components/Menu/menu-component.jsx', () => function Menu() {
    return <div className="Menu"></div>
})
jest.mock('../../src/js/components/NoMatch/no-match-component.jsx', () => function NoMatch() {
    return <div className="NoMatch"></div>
})
jest.mock('../../src/js/components/HomePage/home-page-component.jsx', () => function HomePage() {
    return <div className="HomePage"></div>
})
jest.mock('../../src/js/components/LoginPage/login-page-component.jsx', () => function LoginPage() {
    return <div className="LoginPage"></div>
})
jest.mock('../../src/js/components/ProgramDetail/program-detail-component.jsx', () => function ProgramDetail() {
    return <div className="ProgramDetail"></div>
})
jest.mock('../../src/js/components/PaymentPage/payment-page-component.jsx', () => function PaymentPage() {
    return <div className="PaymentPage"></div>
})
jest.mock('../../src/js/components/LoadingOverlay/loading-overlay-component.jsx', () => function LoadingOverlay() {
    return <div className="LoadingOverlay"></div>
})

describe('App', () => {
    let initialState
    let initialProps
    let store
    let reactStripeElements
    let stripeMockResult
    let stripeSpy
    let replaceSpy
    let retrieveLoginResultSpy
    let listenForAuthStateChangedSpy

    function initializeComponent(props) {
        const $component = shallow(
            <Router initialEntries={[`${PP}`]} initialIndex={0}>
                <App {...props} />
            </Router>
        )

        const componentTree = renderer.create(
            <Router>
                <App {...props} />
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
                    <ConnectedApp {...props} />
                </Router>
            </Provider>
        )

        const componentTree = renderer.create(
            <Provider store={store}>
                <Router>
                    <ConnectedApp {...props} />
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
        stripeMockResult = {
            elements: jest.fn(),
            createToken: jest.fn(),
            createSource: jest.fn(),
        }
        stripeSpy = jest.fn().mockReturnValue(stripeMockResult)
        window.Stripe = stripeSpy

        process.env.perishable_key = 'TEST'

        store = configStore()
        reactStripeElements = jest.genMockFromModule('react-stripe-elements')

        reactStripeElements.StripeProvider = jest.fn()

        replaceSpy = jest.fn()
        retrieveLoginResultSpy = jest.fn()
        listenForAuthStateChangedSpy = jest.fn()

        initialProps = {
            history: {
                replace: replaceSpy
            },
            location: {
                pathname: `${PP}`
            },
            retrieveLoginResult: retrieveLoginResultSpy,
            listenForAuthStateChanged: listenForAuthStateChangedSpy,
            isLoggedIn: true
        }
    })

    test('renders app with home page when route is / and user is logged in', () => {
        const { $component, componentJSON } = initializeComponent(initialProps)

        expect(retrieveLoginResultSpy).toHaveBeenCalled()
        expect(listenForAuthStateChangedSpy).toHaveBeenCalled()
        expect(componentJSON).toMatchSnapshot()
    })

    test('redirects user to login page if they are not logged in', () => {
        const app = shallow(<App {...initialProps} />)

        expect(replaceSpy).not.toHaveBeenCalled()

        app.setProps({
            isLoggedIn: false
        })

        expect(replaceSpy).toHaveBeenCalledTimes(1)

        app.setProps({
            isLoggedIn: true
        })

        expect(replaceSpy).toHaveBeenCalledTimes(1)
    })

    test('renders app with home page when route is / and user is logged in (connected)', () => {
        initialState = {
            user: {
                isLoggedIn: true
            }
        }

        delete initialProps.isLoggedIn

        const { componentJSON } = initializeConnectedComponent(initialProps, initialState)

        expect(componentJSON).toMatchSnapshot()
    })
})