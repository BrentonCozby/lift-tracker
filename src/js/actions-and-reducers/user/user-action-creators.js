import * as firebase from '../../firebase.js'

const FIREBASE_LOGIN_REDIRECT_SUCCESS = 'FIREBASE_LOGIN_REDIRECT_SUCCESS'
const RETRIEVE_LOGIN_RESULT_SUCCESS = 'RETRIEVE_LOGIN_RESULT_SUCCESS'
const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export function firebaseLoginRedirect({loginMethod}) {
    return (dispatch) => {
        return firebase.loginRedirect(loginMethod)
            .then(() => {
                dispatch({type: FIREBASE_LOGIN_REDIRECT_SUCCESS})
            })
    }
}

export function retrieveLoginResult() {
    return (dispatch) => {
        return firebase.retrieveLoginResult()
            .then(result => {
                if (result) {
                    dispatch({
                        type: RETRIEVE_LOGIN_RESULT_SUCCESS,
                        payload: result
                    })

                    return
                }

                dispatch({
                    type: RETRIEVE_LOGIN_RESULT_SUCCESS,
                    payload: null
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
                        type: GET_USER_DATA_SUCCESS,
                        payload: user
                    })

                    return
                }

                dispatch({
                    type: GET_USER_DATA_SUCCESS,
                    payload: null
                })
            })
    }
}

export function logoutOfFirebase() {
    return (dispatch) => {
        return firebase.logout()
            .then(function () {
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: null
                })
            })
    }
}
