import { cloneDeep } from 'lodash'

const INITAL_STATE = {
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

export default function userReducer(state = INITAL_STATE, action) {
    switch (action.type) {
        case 'GET_USER_PROGRAM_DATA_SUCCESS_WITH_PAYLOAD': {
            const { data } = action.payload
            
            return {
                ...state,
                loadingStates: {
                    ...state.loadingStates,
                    isGettingUserProgramData: false
                },
                programs: cloneDeep(data.programs),
                isAdmin: data.isAdmin
            }
        }
        case 'GET_USER_PROGRAM_DATA_SUCCESS_NO_PAYLOAD': {
            return {
                ...state,
                loadingStates: {
                    ...state.loadingStates,
                    isGettingUserProgramData: false
                }
            }
        }
        case 'RETRIEVE_LOGIN_RESULT_SUCCESS_WITH_PAYLOAD': {
            const { user, credential, additionalUserInfo: { profile } } = action.payload // eslint-disable-line no-unused-vars

            return {
                ...state,
                loadingStates: {
                    ...state.loadingStates,
                    isRetrievingLoginResult: false
                },
                uid: user.uid,
                token: credential.accessToken,
                email: user.email,
                fullName: profile.name,
                firstName: profile.givenName,
                lastName: profile.familyName,
                avatar: profile.picture
            }
        }
        case 'RETRIEVE_LOGIN_RESULT_SUCCESS_NO_PAYLOAD': {
            return {
                ...state,
                loadingStates: {
                    ...state.loadingStates,
                    isRetrievingLoginResult: false
                }
            }
        }
        case 'LOGOUT_SUCCESS':
            return INITAL_STATE
        default:
            return state
    }
}
