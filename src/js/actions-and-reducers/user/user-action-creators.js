import * as firebase from '../../firebase.js'

const FIREBASE_LOGIN_REDIRECT_SUCCESS = 'FIREBASE_LOGIN_REDIRECT_SUCCESS'
const FIREBASE_LOGIN_REDIRECT_ERROR = 'FIREBASE_LOGIN_REDIRECT_ERROR'
const RETRIEVE_LOGIN_RESULT_SUCCESS_WITH_PAYLOAD = 'RETRIEVE_LOGIN_RESULT_SUCCESS_WITH_PAYLOAD'
const RETRIEVE_LOGIN_RESULT_SUCCESS_NO_PAYLOAD = 'RETRIEVE_LOGIN_RESULT_SUCCESS_NO_PAYLOAD'
const RETRIEVE_LOGIN_RESULT_ERROR = 'RETRIEVE_LOGIN_RESULT_ERROR'
const GET_USER_PROGRAM_DATA_SUCCESS_WITH_PAYLOAD = 'GET_USER_PROGRAM_DATA_SUCCESS_WITH_PAYLOAD'
const GET_USER_PROGRAM_DATA_SUCCESS_NO_PAYLOAD = 'GET_USER_PROGRAM_DATA_SUCCESS_NO_PAYLOAD'
const GET_USER_PROGRAM_DATA_ERROR = 'GET_USER_PROGRAM_DATA_ERROR'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_ERROR = 'LOGOUT_ERROR'

export function firebaseLoginRedirect({loginMethod}) {
    return (dispatch) => {
        return firebase.loginRedirect(loginMethod)
            .then(() => {
                dispatch({type: FIREBASE_LOGIN_REDIRECT_SUCCESS})
            })
            .catch((error) => {
                dispatch({
                    type: FIREBASE_LOGIN_REDIRECT_ERROR,
                    error
                })
            })
    }
}

export function retrieveLoginResult() {
    return (dispatch) => {
        return firebase.retrieveLoginResult()
            .then(result => {
                if (result) {
                    dispatch({
                        type: RETRIEVE_LOGIN_RESULT_SUCCESS_WITH_PAYLOAD,
                        payload: result
                    })

                    return
                }

                dispatch({
                    type: RETRIEVE_LOGIN_RESULT_SUCCESS_NO_PAYLOAD,
                    payload: null
                })
            })
            .catch((error) => {
                dispatch({
                    type: RETRIEVE_LOGIN_RESULT_ERROR,
                    error
                })
            })
    }
}

export function listenForAuthStateChanged() {
    return (dispatch) => {
        return firebase.onAuthStateChanged()
            .then(user => {
                if (user) {
                    dispatch({
                        type: GET_USER_PROGRAM_DATA_SUCCESS_WITH_PAYLOAD,
                        payload: user
                    })

                    return
                }

                dispatch({
                    type: GET_USER_PROGRAM_DATA_SUCCESS_NO_PAYLOAD,
                    payload: null
                })
            })
            .catch((error) => {
                dispatch({
                    type: GET_USER_PROGRAM_DATA_ERROR,
                    error
                })
            })
    }
}

export function logoutOfFirebase() {
    return (dispatch) => {
        return firebase.logout()
            .then(function () {
                dispatch({
                    type: LOGOUT_SUCCESS
                })
            })
            .catch((error) => {
                dispatch({
                    type: LOGOUT_ERROR,
                    error
                })
            })
    }
}

export function updateUser(uid, data) {
    return (dispatch) => {
        return Promise.resolve()
    }
}
