const INITAL_STATE = {
    defaultSource: '',
    stripe_customer_id: '',
}


export default function stripeReducer(state = INITAL_STATE, action) {
    switch (action.type) {
        case 'STRIPE_CREATE_CUSTOMER_SUCCESS': {
            return {
                ...state,
                stripe_customer_id: action.payload,
            }
        }
        case 'LOGOUT_SUCCESS': {
            return INITAL_STATE
        }
        default:
            return state
    }
}
