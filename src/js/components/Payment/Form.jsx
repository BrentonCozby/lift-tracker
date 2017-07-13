import React, { Component } from 'react'
import {
    injectStripe,
    CardElement
} from 'react-stripe-elements'

class PaymentForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault()

        this.props.stripe.createToken({type: 'card', name: 'Test User'}).then(({token}) => {
            console.log("Received token", token);
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="PaymentForm">
                <CardElement />
                <input type="submit" value="submit"/>
            </form>
        )
    }
}

export default injectStripe(PaymentForm)
