import { alert } from '../../utils/create-alert.js'
import { updateUser } from '../user/user-action-creators.js'
import { store } from '../../index.jsx'

const STRIPE_CREATE_CUSTOMER_STARTED = 'STRIPE_CREATE_CUSTOMER_STARTED'
const STRIPE_CREATE_CUSTOMER_SUCCESS = 'STRIPE_CREATE_CUSTOMER_SUCCESS'
const STRIPE_CREATE_CUSTOMER_ERROR = 'STRIPE_CREATE_CUSTOMER_ERROR'
const STRIPE_GET_CUSTOMER_DATA_STARTED = 'STRIPE_GET_CUSTOMER_DATA_STARTED'
const STRIPE_GET_CUSTOMER_DATA_SUCCESS = 'STRIPE_GET_CUSTOMER_DATA_SUCCESS'
const STRIPE_GET_CUSTOMER_DATA_ERROR = 'STRIPE_GET_CUSTOMER_DATA_ERROR'
const STRIPE_UPDATE_DEFAULT_SOURCE_STARTED = 'STRIPE_UPDATE_DEFAULT_SOURCE_STARTED'
const STRIPE_UPDATE_DEFAULT_SOURCE_SUCCESS = 'STRIPE_UPDATE_DEFAULT_SOURCE_SUCCESS'
const STRIPE_UPDATE_DEFAULT_SOURCE_ERROR = 'STRIPE_UPDATE_DEFAULT_SOURCE_ERROR'
const STRIPE_CHARGED_STARTED = 'STRIPE_CHARGED_STARTED'
const STRIPE_CHARGE_SUCCESS = 'STRIPE_CHARGE_SUCCESS'
const STRIPE_CHARGE_ERROR = 'STRIPE_CHARGE_ERROR'

const API_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:8081/api' : 'https://brentoncozby.com/lift-tracker-api'

function stripeCreateCustomer({ uid, email }) {
    store.dispatch({ type: STRIPE_CREATE_CUSTOMER_STARTED })

    return fetch(API_HOST + '/stripe/createCustomer', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, email }),
    })
    .then(res => res.json())
    .then(({ stripe_customer_id }) => {
        return updateUser(uid, {
            payment: { stripe_customer_id },
        })
        .then(() => stripe_customer_id)
    })
    .then((stripe_customer_id) => {
        store.dispatch({ type: STRIPE_CREATE_CUSTOMER_SUCCESS, payload: stripe_customer_id })
    })
    .catch(error => {
        store.dispatch({ type: STRIPE_CREATE_CUSTOMER_ERROR })
        alert({ message: JSON.stringify(error, null, 2), type: 'error' })
    })
}

function stripeGetCustomerData(stripeObject, stripe_customer_id) {
    return async (dispatch) => {
        dispatch({ type: STRIPE_GET_CUSTOMER_DATA_STARTED })

        return fetch(API_HOST + '/stripe/getCustomerData', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stripe_customer_id })
        })
        .then(customerData => {
            dispatch({ type: STRIPE_GET_CUSTOMER_DATA_SUCCESS, payload: customerData })
        })
        .catch(error => {
            dispatch({ type: STRIPE_GET_CUSTOMER_DATA_ERROR })
            alert({ message: JSON.stringify(error, null, 2), type: 'error' })
        })
    }
}

function stripeUpdateDefaultSource(stripeObject, { token, stripe_customer_id }) {
    return async (dispatch) => {
        dispatch({ type: STRIPE_UPDATE_DEFAULT_SOURCE_STARTED })

        return fetch(API_HOST + '/stripe/updateDefaultSource', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token,
                stripe_customer_id,
            }),
        })
        .then(() => {
            dispatch({ type: STRIPE_UPDATE_DEFAULT_SOURCE_SUCCESS })
            alert({ message: 'New payment method saved.', type: 'success' })
        })
        .catch(error => {
            dispatch({ type: STRIPE_UPDATE_DEFAULT_SOURCE_ERROR })
            alert({ message: JSON.stringify(error, null, 2), type: 'error' })
        })
    }
}

function stripeChargeCustomer(stripeObject, options) {
    return (dispatch) => {
        dispatch({ type: STRIPE_CHARGED_STARTED })

        return stripeObject.createToken()
        .then(({token, error: tokenError}) => {
            if (tokenError) {
                dispatch({ type: STRIPE_CHARGE_ERROR })
                alert({ message: JSON.stringify(tokenError, null, 2), type: 'error' })

                return Promise.reject(tokenError)
            }

            return Promise.resolve(token)
        })
        .then(token => {
            return fetch(API_HOST + '/stripe/chargeCustomer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    ...options,
                }),
            })
        })
        .then(res => {
            if (res.status === 200) {
                dispatch({ type: STRIPE_CHARGE_SUCCESS })
                alert({ message: 'Payment successful!', type: 'success' })
            } else {
                dispatch({ type: STRIPE_CHARGE_ERROR })
                alert({ message: 'Payment failed.', type: 'error' })
            }
        })
        .catch(error => {
            dispatch({ type: STRIPE_CHARGE_ERROR, error })
            alert({ message: JSON.stringify(error), type: 'error' })
        })
    }
}

export {
    stripeCreateCustomer,
    stripeGetCustomerData,
    stripeUpdateDefaultSource,
    stripeChargeCustomer,
}