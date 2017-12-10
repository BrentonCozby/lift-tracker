import * as stripeCtrl from './stripe-controller.js'

const express = require('express')
const router = express.Router()

router.post('/stripe/createCustomer', stripeCtrl.createCustomer)
router.post('/stripe/getCustomerData', stripeCtrl.createCustomer)
router.post('/stripe/updateDefaultSource', stripeCtrl.createCustomer)
router.post('/stripe/chargeCustomer', stripeCtrl.chargeCustomer)

export default router