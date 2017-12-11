const INITAL_STATE = {
    isGettingUserData: true,
    isCreatingToken: false,
}

export default function loadingStatesReducer(state = INITAL_STATE, action) {
    switch (action.type) {
        case 'GET_USER_DATA_STARTED':
            return { ...state, isGettingUserData: true}
        case 'GET_USER_DATA_SUCCESS_WITH_PAYLOAD':
        case 'GET_USER_DATA_SUCCESS_NO_PAYLOAD':
        case 'FIREBASE_LOGIN_REDIRECT_ERROR':
        case 'RETRIEVE_LOGIN_RESULT_ERROR':
            return { ...state, isGettingUserData: false }
        case 'STRIPE_CREATE_CUSTOMER_STARTED':
            return { ...state, isCreatingToken: true }
        case 'STRIPE_CREATE_CUSTOMER_SUCCESS':
        case 'STRIPE_CREATE_CUSTOMER_ERROR':
            return { ...state, isCreatingToken: false }
        default:
            return state
    }
}
