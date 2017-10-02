import React, { Component } from 'react'
import { Elements } from 'react-stripe-elements'
import { connect } from 'react-redux'
import PaymentForm from './Form/index.jsx'

class PaymentPage extends Component {

    render() {

        return (
            <div className="PaymentPage">
                <h2>Payment Form</h2>
                <Elements>
                    <PaymentForm />
                </Elements>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const actions = {
    
}

export default connect(mapStateToProps, actions)(PaymentPage)
