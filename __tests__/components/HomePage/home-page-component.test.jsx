import React from 'react'
import 'raf/polyfill'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configStore from '../../../client/js/store.js'
import ConnectedHomePage, { HomePage } from '../../../client/js/components/HomePage/home-page-component.jsx'

Enzyme.configure({ adapter: new EnzymeAdapter() })

jest.mock('../../../client/js/components/ProgramsList/programs-list-component.jsx')

describe('HomePage', () => {
    let initialState
    let initialProps
    let store
    let pushSpy

    function initializeComponent(props) {
        const $component = shallow(<HomePage {...props} />)

        const componentJSON = renderer.create(<HomePage {...props} />).toJSON()

        return {
            props,
            $component,
            componentJSON
        }
    }

    function initializeConnectedComponent(props, state) {
        store = configStore(state)

        const $component = mount(
            <Provider store={store}>
                <Router>
                    <ConnectedHomePage {...props} />
                </Router>
            </Provider>
        )

        const componentJSON = renderer.create(
            <Provider store={store}>
                <Router>
                    <ConnectedHomePage {...props} />
                </Router>
            </Provider>
        ).toJSON()

        return {
            props,
            $component,
            componentJSON
        }
    }

    beforeEach(() => {
        pushSpy = jest.fn()

        initialProps = {
            history: {
                push: pushSpy
            },
            uid: 'uid1234'
        }
    })

    test('renders home page when user is logged in', () => {
        const { componentJSON } = initializeComponent(initialProps)

        expect(pushSpy).not.toHaveBeenCalled()
        expect(componentJSON).toMatchSnapshot()
    })

    test('pushes history to the login page when user is not logged in', () => {
        initialProps.uid = ''

        const { componentJSON } = initializeComponent(initialProps)

        expect(pushSpy).toHaveBeenCalledWith('login')
        expect(componentJSON).toMatchSnapshot()
    })

    test('renders home page when user is logged in (connected)', () => {
        initialState = {
            user: {
                uid: ''
            }
        }

        initialProps = {
            history: {
                push: pushSpy
            }
        }

        const { componentJSON } = initializeConnectedComponent(initialProps, initialState)

        expect(pushSpy).toHaveBeenCalledWith('login')
        expect(componentJSON).toMatchSnapshot()
    })
})