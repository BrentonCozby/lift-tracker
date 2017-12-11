import { cloneDeep } from 'lodash'
import stripeReducer from '../stripe/stripe-reducer.js'

const INITAL_STATE = {
    uid: '',
    token: '',
    fullName: '',
    firstName: '',
    lastName: '',
    avatar: '',
    email: '',
    programs: {},
    isAdmin: false,
    payment: {},
}

export default function userReducer(state = INITAL_STATE, action) {
    switch (action.type) {
        case 'GET_USER_DATA_SUCCESS_WITH_PAYLOAD': {
            const { data, uid } = action.payload

            return {
                ...state,
                ...data,
                uid,
                programs: cloneDeep(data.programs),
            }
        }
        case 'RETRIEVE_LOGIN_RESULT_SUCCESS_WITH_PAYLOAD': {
            const { user, credential } = action.payload // eslint-disable-line no-unused-vars

            return {
                ...state,
                uid: user.uid,
                token: credential.accessToken,
            }
        }
        case 'LOGOUT_SUCCESS':
            return {
                ...INITAL_STATE,
                payment: stripeReducer(state.payment, action),
            }
        default:
            return {
                ...state,
                payment: stripeReducer(state.payment, action),
            }
    }
}
