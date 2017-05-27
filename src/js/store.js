import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const createStoreWithMiddleware = applyMiddleware(
    reduxPromise,
    thunk
)(createStore)

export default function configStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index.js').default
            store.replaceReducer(nextRootReducer)
        })
    }

  return store
}
