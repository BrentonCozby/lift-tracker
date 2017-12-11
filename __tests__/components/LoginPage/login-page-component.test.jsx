import React from 'react'
import 'raf/polyfill'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configStore from '../../../client/js/store.js'
import ConnectedLoginPage, { LoginPage } from '../../../client/js/components/LoginPage/login-page-component.jsx'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('LoginPage', () => {
    let initialState
    let initialProps
    let store
    let firebaseLoginRedirectSpy
    let setUserLoadingStateSpy
    let replaceSpy
    let pushSpy

    function initializeComponent(props) {
        const $component = shallow(<LoginPage {...props} />)

        const componentTree = renderer.create(
            <Router>
                <LoginPage {...props} />
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
                    <ConnectedLoginPage {...props} />
                </Router>
            </Provider>
        )

        const componentTree = renderer.create(
            <Provider store={store}>
                <Router>
                    <ConnectedLoginPage {...props} />
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
        firebaseLoginRedirectSpy = jest.fn()
        setUserLoadingStateSpy = jest.fn()
        replaceSpy = jest.fn()
        pushSpy = jest.fn()

        initialProps = {
            firebaseLoginRedirect: firebaseLoginRedirectSpy,
            setUserLoadingState: setUserLoadingStateSpy,
            history: {
                replace: replaceSpy,
                push: pushSpy
            },
            uid: '',
            isGettingUserData: false
        }
    })

    test('renders login page when page is done loading', () => {
        const { componentJSON } = initializeComponent(initialProps)

        expect(componentJSON).toMatchSnapshot()
        expect(replaceSpy).not.toHaveBeenCalled()
    })

    test('redirects user to home page in if user is already logged in before component mounts', () => {
        initialProps.uid = 'uid1234'

        initializeComponent(initialProps)

        expect(replaceSpy).toHaveBeenCalledWith(PP)
    })

    test('redirects user to the home page after user successfully logs in', () => {
        const { $component } = initializeComponent(initialProps)

        expect(replaceSpy).not.toHaveBeenCalled()

        $component.setProps({ isGettingUserData: true, uid: 'nextUid1234' })

        expect(pushSpy).not.toHaveBeenCalled()

        $component.setProps({ isGettingUserData: false, uid: 'nextUid1234' })

        expect(pushSpy).toHaveBeenCalledWith(PP)
    })

    test('firebaseLoginRedirect method calls firebaseLoginRedirect action creator with method of the button clicked', () => {
        const instance = initializeComponent(initialProps).$component.instance()

        instance.firebaseLoginRedirect({
            currentTarget: {
                dataset: {
                    method: 'google'
                }
            }
        })

        expect(firebaseLoginRedirectSpy).toHaveBeenCalledWith({ loginMethod: 'google' })
    })

    test('renders login page when page is done loading (connected)', () => {
        initialState = {
            user: {
                uid: 'uid1234',
                loadingStates: {
                    isGettingUserData: false
                }
            }
        }

        delete initialProps.isGettingUserData
        delete initialProps.uid

        const { componentJSON } = initializeConnectedComponent(initialProps, initialState)

        expect(componentJSON).toMatchSnapshot()
    })
})