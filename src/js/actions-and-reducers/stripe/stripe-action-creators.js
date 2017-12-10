import { alert } from '../../utils/create-alert.js'
import { updateUser } from '../user/user-action-creators.js'

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

export function createCustomer(stripeObject, options) {
    return async (dispatch) => {
        dispatch({
            type: STRIPE_CREATE_CUSTOMER_STARTED
        })

        return fetch('/stripe/createCustomer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...options
            })
        })
        .then(({ stripe_customer_id }) => {
            return updateUser(options.uid, {
                stripe_customer_id
            })
            .then(() => stripe_customer_id)
        })
        .then((stripe_customer_id) => {
            dispatch({ type: STRIPE_CREATE_CUSTOMER_SUCCESS, payload: stripe_customer_id })
        })
        .catch(err => {
            dispatch({ type: STRIPE_CREATE_CUSTOMER_ERROR })
            alert({ message: JSON.stringify(err, null, 2), type: 'error' })
        })
    }
}

export function getCustomerData(stripeObject, stripe_customer_id) {
    return async (dispatch) => {
        dispatch({
            type: STRIPE_GET_CUSTOMER_DATA_STARTED
        })

        return fetch('/stripe/getCustomerData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                stripe_customer_id
            })
        })
        .then(customerData => {
            dispatch({ type: STRIPE_GET_CUSTOMER_DATA_SUCCESS, payload: customerData })
        })
        .catch(err => {
            dispatch({ type: STRIPE_GET_CUSTOMER_DATA_ERROR })
            alert({ message: JSON.stringify(err, null, 2), type: 'error' })
        })
    }
}

export function updateDefaultSource(stripeObject, { token, stripe_customer_id }) {
    return async (dispatch) => {
        dispatch({
            type: STRIPE_UPDATE_DEFAULT_SOURCE_STARTED
        })

        return fetch('/stripe/updateDefaultSource', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token,
                stripe_customer_id
            })
        })
        .then(() => {
            dispatch({ type: STRIPE_UPDATE_DEFAULT_SOURCE_SUCCESS })
            alert({ message: 'New payment method saved.', type: 'success' })
        })
        .catch(err => {
            dispatch({ type: STRIPE_UPDATE_DEFAULT_SOURCE_ERROR })
            alert({ message: JSON.stringify(err, null, 2), type: 'error' })
        })
    }
}

export function stripeChargeCustomer(stripeObject, options) {
    return (dispatch) => {
        dispatch({
            type: STRIPE_CHARGED_STARTED
        })

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
            return fetch('/stripe/chargeCustomer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    ...options
                })
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
        .catch(err => {
            dispatch({ type: STRIPE_CHARGE_ERROR, err })
            alert({ message: JSON.stringify(err), type: 'error' })
        })
    }
}
