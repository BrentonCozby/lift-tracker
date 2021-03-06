import { clone } from 'lodash'
import reducer from '../../../client/js/actions-and-reducers/programs/programs-reducer.js'

describe('programs-reducer', () => {
    let state

    beforeEach(() => {
        state = {
            titles: [],
            current: {}
        }
    })

    test('handles the GET_PROGRAM_TITLES_SUCCESS action', () => {
        const action = {
            type: 'GET_PROGRAM_TITLES_SUCCESS',
            payload: {
                id1234: {
                    title: 'title 1'
                },
                id2345: {
                    title: 'title 2'
                }
            }
        }

        const expectedReducedState = {
            ...state,
            titles: [
                {
                    title: 'title 1',
                    id: 'id1234'
                },
                {
                    title: 'title 2',
                    id: 'id2345'
                }
            ]
        }
        
        expect(reducer(state, action)).toEqual(expectedReducedState)
    })

    test('handles the GET_ONE_PROGRAM_SUCCESS action when there is a payload', () => {
        const action = {
            type: 'GET_ONE_PROGRAM_SUCCESS',
            payload: {
                title: 'Program Title 1',
                foo: 'foo',
                bar: ['bar']
            }
        }

        const expectedReducedState = {
            ...state,
            current: clone(action.payload)
        }

        expect(reducer(state, action)).toEqual(expectedReducedState)
    })

    test('handles the GET_ONE_PROGRAM_SUCCESS action when there is no payload', () => {
        const action = {
            type: 'GET_ONE_PROGRAM_SUCCESS',
            payload: undefined
        }

        expect(reducer(state, action)).toEqual(state)
    })

    test('handles the NULLIFY_CURRENT_PROGRAM_SUCCESS action', () => {
        const action = {
            type: 'NULLIFY_CURRENT_PROGRAM_SUCCESS'
        }

        const expectedReducedState = {
            ...state,
            current: null
        }

        expect(reducer(state, action)).toEqual(expectedReducedState)
    })
})