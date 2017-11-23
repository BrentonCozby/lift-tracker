import lodash from 'lodash'
import reducer from '../../../src/js/actions-and-reducers/user/user-reducer.js'

describe('user-reducer', () => {
    let state

    beforeEach(() => {
        state = {
            isLoggedIn: false,
            uid: null,
            token: null,
            username: null,
            programs: null,
            isAdmin: false,
            loadingStates: {
                isGettingUserData: true,
                isRetrievingLoginResult: true
            }
        }
    })

    test('GET_USER_DATA_SUCCESS_NO_PAYLOAD', () => {
        const action = {
            type: 'GET_USER_DATA_SUCCESS_NO_PAYLOAD',
            payload: undefined
        }

        const reducedStateExpected = {
            ...state,
            loadingStates: {
                ...state.loadingStates,
                isGettingUserData: false
            }
        }

        expect(reducer(state, action)).toEqual(reducedStateExpected)
    })

    test('GET_USER_DATA_SUCCESS_WITH_PAYLOAD', () => {
        const action = {
            type: 'GET_USER_DATA_SUCCESS_WITH_PAYLOAD',
            payload: {
                uid: 'uid1234',
                data: {
                    username: 'username',
                    programs: [
                        {title: 'program title', exercises: ['foo', 'bar']}
                    ],
                    isAdmin: true
                }
            }
        }

        const reducedStateExpected = {
            ...state,
            loadingStates: {
                ...state.loadingStates,
                isGettingUserData: false
            },
            uid: action.payload.uid,
            ...lodash.cloneDeep(action.payload.data),
            isLoggedIn: true
        }

        expect(reducer(state, action)).toEqual(reducedStateExpected)
    })

    test('RETRIEVE_LOGIN_RESULT_SUCCESS_NO_PAYLOAD', () => {
        const action = {
            type: 'RETRIEVE_LOGIN_RESULT_SUCCESS_NO_PAYLOAD',
            payload: undefined
        }

        const reducedStateExpected = {
            ...state,
            loadingStates: {
                ...state.loadingStates,
                isRetrievingLoginResult: false
            }
        }

        expect(reducer(state, action)).toEqual(reducedStateExpected)
    })

    test('RETRIEVE_LOGIN_RESULT_SUCCESS_WITH_PAYLOAD', () => {
        const action = {
            type: 'RETRIEVE_LOGIN_RESULT_SUCCESS_WITH_PAYLOAD',
            payload: {
                user: {},
                credential: {
                    accessToken: 'accessToken'
                }
            }
        }

        const reducedStateExpected = {
            ...state,
            loadingStates: {
                ...state.loadingStates,
                isRetrievingLoginResult: false
            },
            token: action.payload.credential.accessToken
        }

        expect(reducer(state, action)).toEqual(reducedStateExpected)
    })

    test('LOGOUT_SUCCESS', () => {
        const action = {
            type: 'LOGOUT_SUCCESS'
        }

        const reducedStateExpected = {
            ...state,
            uid: null,
            username: null,
            token: null,
            isLoggedIn: false,
            isAdmin: false
        }

        expect(reducer(state, action)).toEqual(reducedStateExpected)
    })
})