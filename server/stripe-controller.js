const stripe = require('stripe')(process.env.SECRET_KEY)

function createCustomer(req, res) {
    const { email } = req.body

    if (!email) {
        res.status(500).send({ error: 'email is required' })
    }

    stripe.customers.create({
        email: email
    })
    .then(customer => res.send({ stripe_customer_id: customer.id }))
    .catch(err => {
        console.log(err)
        res.status(500).send({ error: `failed to create customer for email ${email}` })
    })
}

function getCustomerData(req, res) {
    const { stripe_customer_id } = req.body

    if (!stripe_customer_id) {
        res.status(500).send({ error: 'stripe_customer_id is required' })
    }

    stripe.customers.retrieve(stripe_customer_id)
    .then(res.send)
    .catch(err => {
        console.log(err)
        res.status(500).send({ error: `failed to retrieve customer data for stripe_customer_id ${req.body.stripe_customer_id}` })
    })
}

function udpateDefaultSource(req, res) {
    const { token, stripe_customer_id } = req.body

    if (!stripe_customer_id) {
        res.status(500).send({ error: 'stripe_customer_id is required' })
    }

    if (!token || typeof token !== 'object') {
        res.status(500).send({ error: 'token object is required' })
    }

    stripe.customers.update(stripe_customer_id, {
        source: token.id
    })
    .then(() => res.send(`Default source updated for card ending in ${token.card.last4}`))
    .catch(err => {
        console.log(err)
        res.status(500).send(`Failed to update default source for stripe_customer_id ${stripe_customer_id}`)
    })
}

function calculateCartTotal(cart) {
    return Object.keys(cart).reduce((total, nextProductId) => {
        return total += parseFloat(cart[nextProductId].price) * parseInt(cart[nextProductId].quantity)
    }, 0)
}

function createDescription(cart) {
    return Object.keys(cart).reduce((description, nextProductId) => {
        const quantity = cart[nextProductId].quantity
        const productName = cart[nextProductId].name

        return description + `${quantity} of ${productName}; `
    }, '')
}

function chargeCustomer(req, res) {
    const { cart, stripe_customer_id } = req.body

    if (!stripe_customer_id) {
        res.status(500).send({ error: 'stripe_customer_id is required' })
    }

    if (!cart || typeof cart !== 'object') {
        res.status(500).send({ error: 'cart object is required' })
    }

    if (Object.keys(cart).length === 0) {
        res.status(500).send({ error: 'cart is empty' })
    }

    stripe.charges.create({
        amount: calculateCartTotal(cart),
        description: createDescription(cart),
        currency: 'usd',
        customer: stripe_customer_id
    })
    .then(charge => res.send(charge))
    .catch(err => {
        console.log('\n\nStripe Error:\n\n', err)
        res.status(500).send({ error: 'Purchase Failed' })
    })
}

export {
    createCustomer,
    getCustomerData,
    udpateDefaultSource,
    chargeCustomer
}