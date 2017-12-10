import 'raf/polyfill'
import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import configStore from '../../src/js/store.js'
import ConnectedApp, { App } from '../../src/js/components/app-component.jsx'

Enzyme.configure({ adapter: new EnzymeAdapter() })

jest.mock('react-stripe-elements', () => {
    return {
        StripeProvider({ children }) {
            return <div className="StripeProvider">{children}</div>
        }
    }
})
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
    let replaceSpy
    let retrieveLoginResultSpy
    let listenForAuthStateChangedSpy
    let initialEntries
    let initialIndex

    function initializeComponent(props) {
        const $component = mount(
            <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
                <BrowserRouter>
                    <App {...props} />
                </BrowserRouter>
            </MemoryRouter>
        )

        const componentTree = renderer.create(
            <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
                <BrowserRouter>
                    <App {...props} />
                </BrowserRouter>
            </MemoryRouter>
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
                <MemoryRouter>
                    <ConnectedApp {...props} />
                </MemoryRouter>
            </Provider>
        )

        const componentTree = renderer.create(
            <Provider store={store}>
                <MemoryRouter>
                    <ConnectedApp {...props} />
                </MemoryRouter>
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
        replaceSpy = jest.fn()
        retrieveLoginResultSpy = jest.fn()
        listenForAuthStateChangedSpy = jest.fn()

        initialEntries = [`${PP}`]
        initialIndex = 0

        initialProps = {
            history: {
                replace: replaceSpy
            },
            location: {
                pathname: PP
            },
            retrieveLoginResult: retrieveLoginResultSpy,
            listenForAuthStateChanged: listenForAuthStateChangedSpy,
            uid: 'uid1234'
        }
    })

    test('retrieves login result and listens for auth state changed on mount', () => {
        initializeComponent(initialProps)

        expect(retrieveLoginResultSpy).toHaveBeenCalled()
        expect(listenForAuthStateChangedSpy).toHaveBeenCalled()
    })

    test('renders home page when path is /', () => {
        const { $component } = initializeComponent(initialProps)

        expect($component.find('.HomePage').length).toBe(1)
    })

    // test('renders login page when path is "/login"', () => {
    //     initialEntries = [`${PP}login`]

    //     const { $component } = initializeComponent(initialProps)

    //     expect($component.find('.LoginPage').length).toBe(1)
    // })

    // test('renders program detail when path is "/programs/:id"', () => {
    //     initialEntries = [`${PP}programs/1234`]

    //     const { $component } = initializeComponent(initialProps)

    //     expect($component.find('.ProgramDetail').length).toBe(1)
    // })

    // test('renders payment page when path is "/payment"', () => {
    //     initialEntries = [`${PP}payment`]

    //     const { $component } = initializeComponent(initialProps)

    //     expect($component.find('.PaymentPage').length).toBe(1)
    // })

    // test('renders NoMatch component when path is anything else', () => {
    //     initialEntries = [`${PP}foo/bar/baz`]

    //     const { $component } = initializeComponent(initialProps)

    //     expect($component.find('.NoMatch').length).toBe(1)
    // })

    test('redirects user to login page if they are not logged in', () => {
        const app = shallow(<App {...initialProps} />)

        expect(replaceSpy).not.toHaveBeenCalled()

        app.setProps({
            uid: ''
        })

        expect(replaceSpy).toHaveBeenCalledTimes(1)

        app.setProps({
            uid: 'uid1234'
        })

        expect(replaceSpy).toHaveBeenCalledTimes(1)
    })

    test('renders app with home page when route is / and user is logged in (connected)', () => {
        initialState = {
            user: {
                uid: 'uid1234'
            }
        }

        delete initialProps.uid

        const { componentJSON } = initializeConnectedComponent(initialProps, initialState)

        expect(componentJSON).toMatchSnapshot()
    })
})