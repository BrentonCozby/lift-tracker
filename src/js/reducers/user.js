import { cloneDeep } from 'lodash'

const INITAL_STATE = {
    uid: null,
    token: null,
    name: null,
    programs: null
}

export default function(state = INITAL_STATE, action) {
    switch(action.type) {
        case 'GET_USER_DATA':
            const { data, uid } = action.payload
            return {...state,
                uid,
                name: data.name,
                programs: cloneDeep(data.programs)
            }
        case 'RETRIEVE_LOGIN_RESULT':
            return {...state, token: action.payload.credential.accessToken}
        case 'LOGOUT':
            return {...state, uid: null, name: null, token: null}
        default:
            return state
    }
}
