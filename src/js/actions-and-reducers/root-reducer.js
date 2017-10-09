import { combineReducers } from 'redux'

import userReducer from './user/user-reducer.js'
import programsReducer from './programs/programs-reducer.js'

const rootReducer = combineReducers({
    programs: programsReducer,
    user: userReducer
})

export default rootReducer
