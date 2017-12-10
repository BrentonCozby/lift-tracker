import React from 'react'
import 'raf/polyfill'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configStore from '../../../src/js/store.js'
import ConnectedProgramDetail, { ProgramDetail } from '../../../src/js/components/ProgramDetail/program-detail-component.jsx'

Enzyme.configure({ adapter: new EnzymeAdapter() })

jest.mock('../../../src/js/programs/DUHR/DUHR-component.jsx', () => {
    return {
        default: function CurrentProgramComponent() {
            return (<div>Current Program</div>)
        }
    }
})

describe('ProgramDetail', () => {
    let initialState
    let initialProps
    let store
    let setCurrentProgramSpy

    function initializeComponent(props) {
        const $component = shallow(
            <Router>
                <ProgramDetail {...props} />
            </Router>
        )

        const componentJSON = renderer.create(
            <Router>
                <ProgramDetail {...props} />
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
                    <ConnectedProgramDetail {...props} />
                </Router>
            </Provider>
        )

        const componentJSON = renderer.create(
            <Provider store={store}>
                <Router>
                    <ConnectedProgramDetail {...props} />
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
        setCurrentProgramSpy = jest.fn()

        initialProps = {
            setCurrentProgram: setCurrentProgramSpy,
            programId: 'programId1234',
            uid: 'uid1234',
            currentProgram: {
                dirName: 'DUHR'
            }
        }
    })

    test('renders program detail when a current program exists', () => {
        const { componentJSON } = initializeComponent(initialProps)

        expect(componentJSON).toMatchSnapshot()
    })

    test('renders program detail when a current program exists (connected)', () => {
        initialState = {
            user: {
                uid: 'uid1234'
            },
            programs: {
                currentProgram: {
                    dirName: 'DUHR'
                }
            }
        }

        delete initialProps.uid
        delete initialProps.currentProgram

        const { componentJSON } = initializeConnectedComponent(initialProps, initialState)

        expect(componentJSON).toMatchSnapshot()
    })
})