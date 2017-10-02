import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxPromise from 'redux-promise'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options 
})

const middleware = applyMiddleware(
    reduxPromise,
    thunk
)

export default function configStore(initialState) {
    const store = createStore(rootReducer, initialState, composeEnhancers(middleware))

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index.js').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
