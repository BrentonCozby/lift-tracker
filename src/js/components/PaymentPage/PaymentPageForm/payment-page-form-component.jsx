import React, { Component } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { CardElement } from 'react-stripe-elements'
import { alert } from '../../../actions-and-reducers/utils/create-alert.js'
import { stripeCreateToken } from '../../../actions-and-reducers/stripe/stripe-action-creators.js'

export class PaymentPageForm extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    static propTypes = {
        stripe: PropTypes.object,
        alert: PropTypes.func,
        stripeCreateToken: PropTypes.func
    }

    onSubmit(e) {
        e.preventDefault()

        this.props.stripeCreateToken(this.props.stripe)
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="PaymentForm">
                <CardElement />
                <input type="submit" value="submit" />
            </form>
        )
    }
}

const mapStateToProps = state => ({ // eslint-disable-line no-unused-vars

})

const actions = {
    alert,
    stripeCreateToken
}

export default connect(mapStateToProps, actions)(injectStripe(PaymentPageForm))
