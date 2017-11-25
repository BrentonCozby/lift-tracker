import React from 'react'
import 'raf/polyfill'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configStore from '../../../../src/js/store.js'
import ConnectedProgramCard, { ProgramCard } from '../../../../src/js/components/ProgramsList/ProgramCard/program-card-component.jsx'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('ProgramCard', () => {
    let initialState
    let initialProps
    let store

    function initializeComponent(props) {
        const $component = shallow(
            <Router>
                <ProgramCard {...props} />
            </Router>
        )

        const componentJSON = renderer.create(
            <Router>
                <ProgramCard {...props} />
            </Router>
        ).toJSON()

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
                    <ConnectedProgramCard {...props} />
                </Router>
            </Provider>
        )

        const componentJSON = renderer.create(
            <Provider store={store}>
                <Router>
                    <ConnectedProgramCard {...props} />
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
        initialProps = {
            programId: 'programId1234',
            title: 'program title',
            userId: 'userId1234',
            uid: 'uid1234'
        }
    })

    test('renders program card when user is logged in', () => {
        const { componentJSON } = initializeComponent(initialProps)

        expect(componentJSON).toMatchSnapshot()
    })

    test('renders program card when user is logged in (connected)', () => {
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