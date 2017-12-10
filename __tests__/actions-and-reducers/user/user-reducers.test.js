import lodash from 'lodash'
import reducer from '../../../src/js/actions-and-reducers/user/user-reducer.js'

describe('user-reducer', () => {
    let state

    beforeEach(() => {
        state = {
            uid: '',
            token: '',
            fullName: '',
            firstName: '',
            lastName: '',
            avatar: '',
            email: '',
            programs: [],
            isAdmin: false,
            loadingStates: {
                isGettingUserProgramData: true,
                isRetrievingLoginResult: true
            }
        }
    })

    test('GET_USER_PROGRAM_DATA_SUCCESS_NO_PAYLOAD', () => {
        const action = {
            type: 'GET_USER_PROGRAM_DATA_SUCCESS_NO_PAYLOAD',
            payload: undefined
        }

        const reducedStateExpected = {
            ...state,
            loadingStates: {
                ...state.loadingStates,
                isGettingUserProgramData: false
            }
        }

        expect(reducer(state, action)).toEqual(reducedStateExpected)
    })

    test('GET_USER_PROGRAM_DATA_SUCCESS_WITH_PAYLOAD', () => {
        const action = {
            type: 'GET_USER_PROGRAM_DATA_SUCCESS_WITH_PAYLOAD',
            payload: {
                data: {
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
                isGettingUserProgramData: false
            },
            ...lodash.cloneDeep(action.payload.data)
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
                user: {
                    uid: 'uid1234',
                    email: 'foo@gmail.com'
                },
                credential: {
                    accessToken: 'accessToken'
                },
                additionalUserInfo: {
                    profile: {
                        name: 'name',
                        givenName: 'givenName',
                        familyName: 'familyName',
                        picture: 'picture'
                    }
                }
            }
        }

        const reducedStateExpected = {
            ...state,
            loadingStates: {
                ...state.loadingStates,
                isRetrievingLoginResult: false
            },
            token: action.payload.credential.accessToken,
            uid: action.payload.user.uid,
            email: action.payload.user.email,
            fullName: action.payload.additionalUserInfo.profile.name,
            firstName: action.payload.additionalUserInfo.profile.givenName,
            lastName: action.payload.additionalUserInfo.profile.familyName,
            avatar: action.payload.additionalUserInfo.profile.picture
        }

        expect(reducer(state, action)).toEqual(reducedStateExpected)
    })

    test('LOGOUT_SUCCESS', () => {
        const action = {
            type: 'LOGOUT_SUCCESS'
        }

        const dirtyState = {
            uid: 'uid1234',
            token: 'token1234',
            fullName: 'fullName',
            firstName: 'firstName',
            lastName: 'lastName',
            avatar: 'avatar',
            email: 'email',
            programs: [
                {title: 'title1'}
            ],
            isAdmin: true,
            loadingStates: {
                isGettingUserProgramData: false,
                isRetrievingLoginResult: false
            }
        }

        expect(reducer(dirtyState, action)).toEqual(state)
    })
})