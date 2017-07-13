import React, { Component } from 'react'
import { Elements } from 'react-stripe-elements'
import PaymentForm from './Form.jsx'

class PaymentFormWrapper extends Component {

    render() {

        return (
            <div className="PaymentFormWrapper">
                <h2>Payment Form</h2>
                <Elements>
                    <PaymentForm />
                </Elements>
            </div>
        )
    }
}

export default PaymentFormWrapper
