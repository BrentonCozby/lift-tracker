import { alert } from '../utils/create-alert.js'

const CREATE_TOKEN_STARTED = 'CREATE_TOKEN_STARTED'
const CREATE_TOKEN_SUCCESS = 'CREATE_TOKEN_SUCCESS'
const CREATE_TOKEN_ERROR = 'CREATE_TOKEN_ERROR'

export function stripeCreateToken(stripeObject, ...args) {
    return async (dispatch) => {
        dispatch({
            type: CREATE_TOKEN_STARTED
        })

        const { token, error: tokenError } = await stripeObject.createToken()

        if (tokenError) {
            alert({
                message: JSON.stringify(tokenError, null, 2),
                type: 'error'
            })

            dispatch({
                type: CREATE_TOKEN_ERROR,
                tokenError
            })

            return
        }

        dispatch({
            type: CREATE_TOKEN_SUCCESS,
            payload: token
        })
    }
}