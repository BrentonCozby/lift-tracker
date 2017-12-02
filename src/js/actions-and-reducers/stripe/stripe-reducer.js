const INITAL_STATE = {
    loadingStates: {
        isCreatingToken: false
    }
}

export default function stripeReducer(state = INITAL_STATE, action) {
    switch (action.type) {
        case 'CREATE_TOKEN_STARTED': {
            return { ...state, loadingStates: { isCreatingToken: true } }
        }
        case 'CREATE_TOKEN_SUCCESS': {
            return { ...state, loadingStates: { isCreatingToken: false } }
        }
        case 'CREATE_TOKEN_ERROR': {
            return { ...state, loadingStates: { isCreatingToken: false } }
        }
        default:
            return state
    }
}
