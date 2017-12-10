const INITAL_STATE = {
    defaultSource: '',
    stripe_customer_id: '',
    loadingStates: {
        isCreatingToken: false
    }
}


export default function stripeReducer(state = INITAL_STATE, action) {
    switch (action.type) {
        case 'STRIPE_CREATE_CUSTOMER_STARTED': {
            return { ...state, loadingStates: { isCreatingToken: true } }
        }
        case 'STRIPE_CREATE_CUSTOMER_SUCCESS': {
            return {
                ...state,
                stripe_customer_id: action.payload,
                loadingStates: { isCreatingToken: false }
            }
        }
        case 'STRIPE_CREATE_CUSTOMER_ERROR': {
            return { ...state, loadingStates: { isCreatingToken: false } }
        }
        case 'LOGOUT_SUCCESS': {
            return INITAL_STATE
        }
        default:
            return state
    }
}
