import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from '../../../src/js/actions-and-reducers/user/user-action-creators.js'
import * as firebase from '../../../src/js/firebase.js'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)