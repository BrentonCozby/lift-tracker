import React, { Component } from 'react'
import { Elements } from 'react-stripe-elements'
import { connect } from 'react-redux'

import PaymentPageForm from './PaymentPageForm/payment-page-form-component.jsx'

export class PaymentPage extends Component {

    render() {

        return (
            <div className="PaymentPage">
                <h2>Payment Form</h2>
                <Elements>
                    <PaymentPageForm />
                </Elements>
            </div>
        )
    }
}

const mapStateToProps = state => ({ // eslint-disable-line no-unused-vars

})

const actions = {
    
}

export default connect(mapStateToProps, actions)(PaymentPage)
