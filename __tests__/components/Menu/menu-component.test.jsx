import React from 'react'
import 'raf/polyfill'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configStore from '../../../client/js/store.js'
import ConnectedMenu, { Menu } from '../../../client/js/components/Menu/menu-component.jsx'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('Menu', () => {
    let initialState
    let initialProps
    let store
    let logoutOfFirebaseSpy

    function initializeComponent(props) {
        const $component = shallow(<Menu {...props} />)

        const componentTree = renderer.create(
            <Router>
                <Menu {...props} />
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
                    <ConnectedMenu {...props} />
                </Router>
            </Provider>
        )

        const componentTree = renderer.create(
            <Provider store={store}>
                <Router>
                    <ConnectedMenu {...props} />
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
        logoutOfFirebaseSpy = jest.fn()

        initialProps = {
            logoutOfFirebase: logoutOfFirebaseSpy,
            uid: '',
            fullName: 'fullName'
        }
    })

    test('renders menu in unopened state when user is not logged in', () => {
        const { $component, componentJSON } = initializeComponent(initialProps)

        expect($component.find('.Menu').hasClass('visible')).toBe(false)
        expect($component.find('.menu-overlay').hasClass('visible')).toBe(false)
        expect($component.find('.menu-button').hasClass('close')).toBe(false)
        expect($component.find('.fullName').length).toBe(0)
        expect(componentJSON).toMatchSnapshot()
    })

    test('renders menu in opened state when user is not logged in', () => {
        const { $component, componentJSON } = initializeComponent(initialProps)

        $component.setState({ isMenuVisible: true })

        expect($component.find('.Menu').hasClass('visible')).toBe(true)
        expect($component.find('.menu-overlay').hasClass('visible')).toBe(true)
        expect($component.find('.menu-button').hasClass('close')).toBe(true)
        expect($component.find('.fullName').length).toBe(0)
        expect(componentJSON).toMatchSnapshot()
    })

    test('renders menu in unopened state when user is logged in', () => {
        initialProps.uid = 'uid1234'

        const { $component, componentJSON } = initializeComponent(initialProps)

        expect($component.find('.Menu').hasClass('visible')).toBe(false)
        expect($component.find('.menu-overlay').hasClass('visible')).toBe(false)
        expect($component.find('.menu-button').hasClass('close')).toBe(false)
        expect($component.find('.fullName').length).toBe(1)
        expect(componentJSON).toMatchSnapshot()
    })

    test('renders menu in opened state when user is logged in', () => {
        initialProps.uid = 'uid1234'

        const { $component, componentJSON } = initializeComponent(initialProps)

        $component.setState({ isMenuVisible: true })

        expect($component.find('.Menu').hasClass('visible')).toBe(true)
        expect($component.find('.menu-overlay').hasClass('visible')).toBe(true)
        expect($component.find('.menu-button').hasClass('close')).toBe(true)
        expect($component.find('.fullName').length).toBe(1)
        expect(componentJSON).toMatchSnapshot()
    })

    test('toggleMenu method toggles isMenuVisible state', () => {
        const instance = initializeComponent(initialProps).$component.instance()

        expect(instance.state.isMenuVisible).toBe(false)
        instance.toggleMenu()
        expect(instance.state.isMenuVisible).toBe(true)
    })

    test('logout method logs out of firebase and toggles the menu', () => {
        const instance = initializeComponent(initialProps).$component.instance()

        const toggleMenuSpy = jest.fn()

        instance.toggleMenu = toggleMenuSpy

        instance.logout()

        expect(logoutOfFirebaseSpy).toHaveBeenCalledTimes(1)
        expect(toggleMenuSpy).toHaveBeenCalledTimes(1)
    })

    test('renders menu in unopened state when user is not logged in (connected)', () => {
        initialState = {
            user: {
                fullName: 'fullName',
                uid: ''
            }
        }

        delete initialProps.fullName
        delete initialProps.uid

        const { $component, componentJSON } = initializeConnectedComponent(initialProps, initialState)

        expect($component.find('.Menu').hasClass('visible')).toBe(false)
        expect($component.find('.menu-overlay').hasClass('visible')).toBe(false)
        expect($component.find('.menu-button').hasClass('close')).toBe(false)

        expect(componentJSON).toMatchSnapshot()
    })
})