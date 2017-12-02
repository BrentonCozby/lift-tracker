import { combineReducers } from 'redux'

import userReducer from './user/user-reducer.js'
import programsReducer from './programs/programs-reducer.js'
import stripeReducer from './stripe/stripe-reducer.js'

const rootReducer = combineReducers({
    programs: programsReducer,
    user: userReducer,
    stripe: stripeReducer
})

export default rootReducer
