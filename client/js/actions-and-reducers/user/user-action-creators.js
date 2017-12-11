import * as firebase from '../../firebase.js'
import { store } from '../../index.jsx'
import { alert } from '../../utils/create-alert.js'
import { stripeCreateCustomer } from '../stripe/stripe-action-creators.js'

const FIREBASE_LOGIN_REDIRECT_ERROR = 'FIREBASE_LOGIN_REDIRECT_ERROR'
const RETRIEVE_LOGIN_RESULT_SUCCESS_WITH_PAYLOAD = 'RETRIEVE_LOGIN_RESULT_SUCCESS_WITH_PAYLOAD'
const RETRIEVE_LOGIN_RESULT_SUCCESS_NO_PAYLOAD = 'RETRIEVE_LOGIN_RESULT_SUCCESS_NO_PAYLOAD'
const RETRIEVE_LOGIN_RESULT_ERROR = 'RETRIEVE_LOGIN_RESULT_ERROR'
const GET_USER_DATA_STARTED = 'GET_USER_DATA_STARTED'
const GET_USER_DATA_SUCCESS_WITH_PAYLOAD = 'GET_USER_DATA_SUCCESS_WITH_PAYLOAD'
const GET_USER_DATA_SUCCESS_NO_PAYLOAD = 'GET_USER_DATA_SUCCESS_NO_PAYLOAD'
const GET_USER_DATA_ERROR = 'GET_USER_DATA_ERROR'
const LOGOUT_STARTED = 'LOGOUT_STARTED'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_ERROR = 'LOGOUT_ERROR'
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR'

function firebaseLoginRedirect({loginMethod}) {
    return (dispatch) => {
        dispatch({ type: GET_USER_DATA_STARTED })

        return firebase.loginRedirect(loginMethod)
        .catch((error) => {
            dispatch({ type: FIREBASE_LOGIN_REDIRECT_ERROR, error })
            alert({ message: JSON.stringify(error, null, 2), type: 'error' })
        })
    }
}

function retrieveLoginResult() {
    return (dispatch) => {
        return firebase.retrieveLoginResult()
        .then(result => {
            if (result) {
                dispatch({ type: RETRIEVE_LOGIN_RESULT_SUCCESS_WITH_PAYLOAD, payload: result })
            } else {
                dispatch({ type: RETRIEVE_LOGIN_RESULT_SUCCESS_NO_PAYLOAD, payload: null })
            }
        })
        .catch((error) => {
            dispatch({ type: RETRIEVE_LOGIN_RESULT_ERROR, error })
            alert({ message: JSON.stringify(error, null, 2), type: 'error' })
        })
    }
}

function listenForAuthStateChanged() {
    return (dispatch) => {
        return firebase.onAuthStateChanged()
        .then(user => {
            if (user) {
                dispatch({ type: GET_USER_DATA_SUCCESS_WITH_PAYLOAD, payload: user })

                if (user.data.email && (!user.data.payment || !user.data.payment.stripe_customer_id)) {
                    stripeCreateCustomer({ uid: user.uid, email: user.data.email })
                }
            } else {
                dispatch({ type: GET_USER_DATA_SUCCESS_NO_PAYLOAD, payload: null })
            }
        })
        .catch((error) => {
            dispatch({ type: GET_USER_DATA_ERROR, error })
            alert({ message: JSON.stringify(error, null, 2), type: 'error' })
        })
    }
}

function logoutOfFirebase() {
    return (dispatch) => {
        dispatch({ type: LOGOUT_STARTED })

        return firebase.logout()
        .then(function () {
            dispatch({ type: LOGOUT_SUCCESS })
        })
        .catch((error) => {
            dispatch({ type: LOGOUT_ERROR, error })
            alert({ message: JSON.stringify(error, null, 2), type: 'error' })
        })
    }
}

function updateUser(uid, data) {
    return firebase.updateUser(uid, data)
    .then((userData) => {
        store.dispatch({ type: UPDATE_USER_SUCCESS, payload: userData })
    })
    .catch(error => {
        store.dispatch({ type: UPDATE_USER_ERROR, error })
        alert({ message: JSON.stringify(error, null, 2), type: 'error' })
    })
}

export {
    firebaseLoginRedirect,
    retrieveLoginResult,
    listenForAuthStateChanged,
    logoutOfFirebase,
    updateUser,
}