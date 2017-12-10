import React from 'react'
import 'raf/polyfill'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configStore from '../../../src/js/store.js'
import ConnectedLoadingOverlay, { LoadingOverlay } from '../../../src/js/components/LoadingOverlay/loading-overlay-component.jsx'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('LoadingOverlay', () => {
    let initialState
    let store

    function initializeComponent(props) {
        const $component = shallow(<LoadingOverlay {...props} />)

        const componentJSON = renderer.create(<LoadingOverlay {...props} />).toJSON()

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
                <ConnectedLoadingOverlay {...props} />
            </Provider>
        )

        const componentJSON = renderer.create(
            <Provider store={store}>
                <ConnectedLoadingOverlay {...props} />
            </Provider>
        ).toJSON()

        return {
            props,
            $component,
            componentJSON
        }
    }

    test('does not have class "visible" when all loading states are false', () => {
        let initialProps = {
            loadingStates: {
                isGettingUserProgramData: false,
                isRetrievingLoginResult: false
            }
        }

        const { $component, componentJSON } = initializeComponent(initialProps)

        expect($component.find('.LoadingOverlay').hasClass('visible')).toBe(false)
        expect(componentJSON).toMatchSnapshot()
    })

    test('has class "visible" when some loading states are true', () => {
        let initialProps = {
            loadingStates: {
                isGettingUserProgramData: true,
                isRetrievingLoginResult: false
            }
        }

        const { $component, componentJSON } = initializeComponent(initialProps)

        expect($component.find('.LoadingOverlay').hasClass('visible')).toBe(true)
        expect(componentJSON).toMatchSnapshot()
    })

    test('adds class "visible" when nextProps include a loadingState with a value of true', () => {
        let initialProps = {
            loadingStates: {
                isGettingUserProgramData: false,
                isRetrievingLoginResult: false
            }
        }

        const { $component, componentJSON } = initializeComponent(initialProps)

        expect($component.find('.LoadingOverlay').hasClass('visible')).toBe(false)

        $component.setProps({
            loadingStates: {
                isGettingUserProgramData: true
            }
        })

        expect($component.find('.LoadingOverlay').hasClass('visible')).toBe(true)
        expect(componentJSON).toMatchSnapshot()
    })

    test('does not have class "visible" when all loading states are false (connected)', () => {
        initialState = {
            user: {
                loadingStates: {
                    isGettingUserProgramData: false,
                    isRetrievingLoginResult: false
                }
            }
        }

        const { $component, componentJSON } = initializeConnectedComponent(null, initialState)

        expect($component.find('.LoadingOverlay').hasClass('visible')).toBe(false)
        expect(componentJSON).toMatchSnapshot()
    })
})