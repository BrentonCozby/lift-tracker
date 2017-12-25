import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import loadingStatesReducer from './loading-states/loading-states-reducer.js'
import userReducer from './user/user-reducer.js'
import programsReducer from './programs/programs-reducer.js'
import checkoutReducer from './checkout/checkout-reducer.js'

const rootReducer = combineReducers({
    router: routerReducer,
    loadingStates: loadingStatesReducer,
    user: userReducer,
    programs: programsReducer,
    checkout: checkoutReducer,
})

export default rootReducer
