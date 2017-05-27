import { combineReducers } from 'redux'

import thingsReducer from './example.js'

const rootReducer = combineReducers({
    things: thingsReducer
})

export default rootReducer
