import * as firebase from '../firebase.js'

export function firebaseLoginRedirect(loginMethod) {
    return () => firebase.loginRedirect(loginMethod)
}

export function retrieveLoginResult() {
    return dispatch => firebase.retrieveLoginResult()
        .then(result => {
            if(result) {
                dispatch({
                    type: 'RETRIEVE_LOGIN_RESULT',
                    payload: result
                })
            }
            
            dispatch({
                type: 'RETRIEVE_LOGIN_RESULT',
                payload: null
            })
        })
}

export function listenForAuthStateChanged() {
    return dispatch => {
        firebase.onAuthStateChanged()
            .then(user => {
                if (user) {
                    dispatch({
                        type: 'GET_USER_DATA',
                        payload: user
                    })
                }

                dispatch({
                    type: 'GET_USER_DATA',
                    payload: null
                })
            })
    }
}

export function logoutOfFirebase() {
    return dispatch => firebase.logout()
        .then(function() {
            dispatch({
                type: 'LOGOUT',
                payload: null
            })
        })
}
