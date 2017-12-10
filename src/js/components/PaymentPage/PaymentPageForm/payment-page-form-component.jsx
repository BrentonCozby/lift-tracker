import React, { Component } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { CardElement } from 'react-stripe-elements'
import { stripeCharge } from '../../../actions-and-reducers/stripe/stripe-action-creators.js'

export class PaymentPageForm extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    static propTypes = {
        stripe: PropTypes.object,
        alert: PropTypes.func,
        stripeCharge: PropTypes.func,
        user: PropTypes.object,
        cart: PropTypes.object
    }

    onSubmit(e) {
        e.preventDefault()

        this.props.stripeChargeCustomer(this.props.stripe, {
            stripe_customer_id: this.props.user.stripe.stripe_customer_id,
            cart: this.props.cart
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="PaymentPageForm">
                <CardElement className="CardElement" />
                <input type="submit" value="pay" className="submit-btn" />
            </form>
        )
    }
}

const mapStateToProps = state => ({ // eslint-disable-line no-unused-vars
    cart: state.checkout.cart,
    user: state.user
})

const actions = {
    stripeCharge
}

export default injectStripe(connect(mapStateToProps, actions)(PaymentPageForm))
