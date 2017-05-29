import { combineReducers } from 'redux'

import userReducer from './user.js'
import programsReducer from './programs.js'

const rootReducer = combineReducers({
    programs: programsReducer,
    user: userReducer
})

export default rootReducer
