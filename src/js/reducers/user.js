import { cloneDeep } from 'lodash'

const INITAL_STATE = {
    uid: null,
    token: null,
    username: null,
    programs: null,
    isAdmin: false
}

export default function(state = INITAL_STATE, action) {
    switch(action.type) {
        case 'GET_USER_DATA': {
            const { data, uid } = action.payload
            return {
                ...state,
                uid,
                username: data.username,
                programs: cloneDeep(data.programs),
                isAdmin: data.isAdmin
            }
        }
        case 'RETRIEVE_LOGIN_RESULT':
            return {...state, token: action.payload.credential.accessToken}
        case 'LOGOUT':
            return {...state, uid: null, username: null, token: null}
        default:
            return state
    }
}
