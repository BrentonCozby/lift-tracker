import React, { Component } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { connect } from 'react-redux'
import View from './view.jsx'

class PaymentForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault()

        this.props.stripe.createToken({type: 'card', name: 'Test User'}).then(({token}) => {
            console.log("Received token", token);
        });
    }

    render() {
        return (
            <View
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

const mapStateToProps = state => ({

})

const actions = {

}

export default connect(mapStateToProps, actions)(injectStripe(PaymentForm))
