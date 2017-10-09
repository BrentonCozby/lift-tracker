import React, { Component } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { CardElement } from 'react-stripe-elements'

class Form extends Component {

    static propTypes = {
        stripe: PropTypes.object
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.props.stripe.createToken({type: 'card', name: 'Test User'}).then(({token}) => {
            console.log('Received token', token)
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="PaymentForm">
                <CardElement />
                <input type="submit" value="submit" />
            </form>
        )
    }
}

const mapStateToProps = state => ({ // eslint-disable-line no-unused-vars

})

const actions = {

}

export default connect(mapStateToProps, actions)(injectStripe(Form))
