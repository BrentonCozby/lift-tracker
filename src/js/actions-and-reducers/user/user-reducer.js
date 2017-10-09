import { cloneDeep } from 'lodash'

const INITAL_STATE = {
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

export default function(state = INITAL_STATE, action) {
    switch (action.type) {
        case 'GET_USER_DATA': {
            const newState = {
                ...state,
                loadingStates: {
                    ...state.loadingStates,
                    isGettingUserData: false
                }
            }

            if (action.payload) {
                const { data, uid } = action.payload

                newState.uid = uid,
                newState.username = data.username,
                newState.programs = cloneDeep(data.programs),
                newState.isAdmin = data.isAdmin
                newState.isLoggedIn = true
            }

            return newState
        }
        case 'RETRIEVE_LOGIN_RESULT': {
            const newState = {
                ...state,
                loadingStates: {
                    ...state.loadingStates,
                    isRetrievingLoginResult: false
                }
            }

            if (action.payload) {
                const { user, credential } = action.payload // eslint-disable-line no-unused-vars

                newState.token = credential.accessToken
            }

            return newState
        }
        case 'LOGOUT':
            return {
                ...state,
                uid: null,
                username: null,
                token: null,
                isLoggedIn: false,
                isAdmin: false
            }
        default:
            return state
    }
}
