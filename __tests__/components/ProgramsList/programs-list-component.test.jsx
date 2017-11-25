import React from 'react'
import 'raf/polyfill'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configStore from '../../../src/js/store.js'
import ConnectedProgramsList, { ProgramsList } from '../../../src/js/components/ProgramsList/programs-list-component.jsx'

Enzyme.configure({ adapter: new EnzymeAdapter() })

jest.mock('../../../src/js/components/ProgramsList/ProgramCard/program-card-component.jsx')

describe('ProgramsList', () => {
    let initialState
    let initialProps
    let store
    let stopListeningToCurrentProgramSpy
    let nullifyCurrentProgramSpy
    let saveNewProgramSpy
    let getProgramTitlesSpy

    function initializeComponent(props) {
        const $component = shallow(<ProgramsList {...props} />)

        const componentTree = renderer.create(
            <Router>
                <ProgramsList {...props} />
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
                    <ConnectedProgramsList {...props} />
                </Router>
            </Provider>
        )

        const componentTree = renderer.create(
            <Provider store={store}>
                <Router>
                    <ConnectedProgramsList {...props} />
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
        stopListeningToCurrentProgramSpy = jest.fn()
        nullifyCurrentProgramSpy = jest.fn()
        saveNewProgramSpy = jest.fn()
        getProgramTitlesSpy = jest.fn()

        initialProps = {
            stopListeningToCurrentProgram: stopListeningToCurrentProgramSpy,
            nullifyCurrentProgram: nullifyCurrentProgramSpy,
            saveNewProgram: saveNewProgramSpy,
            getProgramTitles: getProgramTitlesSpy,
            userId: 'userId1234',
            isLoggedIn: true,
            isAdmin: true,
            programTitles: [
                { title: 'Program Title 1', id: '1'},
                { title: 'Program Title 2', id: '2'}
            ]
        }
    })

    test('renders Programs List when user is logged in', () => {
        const { $component, componentJSON } = initializeComponent(initialProps)

        expect(componentJSON).toMatchSnapshot()
    })

    test('saveNewProgram method calls props.saveNewProgram action creator with program data', () => {
        const instance = initializeComponent(initialProps).$component.instance()
        const newProgram = { title: 'New Program Title', id: '3' }

        instance.saveNewProgram(newProgram)

        expect(saveNewProgramSpy).toHaveBeenCalledWith({programData: newProgram})
    })

    test('renders renders Programs List when user is logged in (connected)', () => {
        initialState = {
            user: {
                isAdmin: true,
                isLoggedIn: true,
                uid: 'uid1234'
            },
            programs: {
                titles: [
                    { title: 'Program Title 1', id: '1' },
                    { title: 'Program Title 2', id: '2' }
                ]
            }
        }

        delete initialProps.programTitles
        delete initialProps.isLoggedIn
        delete initialProps.isAdmin
        delete initialProps.userId

        const { $component, componentJSON } = initializeConnectedComponent(initialProps, initialState)

        expect(componentJSON).toMatchSnapshot()
    })
})