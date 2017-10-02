import React from 'react'
import { CardElement } from 'react-stripe-elements'

export default ({
    handleSubmit
}) => {

    return (
        <form onSubmit={handleSubmit} className="PaymentForm">
            <CardElement />
            <input type="submit" value="submit" />
        </form>
    )
}