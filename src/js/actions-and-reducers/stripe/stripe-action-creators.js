import { alert } from '../utils/create-alert.js'

const CREATE_TOKEN_STARTED = 'CREATE_TOKEN_STARTED'
const CREATE_TOKEN_SUCCESS = 'CREATE_TOKEN_SUCCESS'
const CREATE_TOKEN_ERROR = 'CREATE_TOKEN_ERROR'

export function stripeCreateToken(stripeObject, ...args) {
    return async (dispatch) => {
        dispatch({
            type: CREATE_TOKEN_STARTED
        })

        const { token, error } = await stripeObject.createToken(args)

        if (error) {
            alert({
                message: JSON.stringify(error, null, 2),
                type: 'error'
            })

            dispatch({
                type: CREATE_TOKEN_ERROR,
                error
            })
        }

        dispatch({
            type: CREATE_TOKEN_SUCCESS,
            payload: token
        })
    }
}