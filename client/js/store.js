import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxPromise from 'redux-promise'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './actions-and-reducers/root-reducer.js'

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options 
})

const middleware = applyMiddleware(
    reduxPromise,
    thunk,
    routerMiddleware(createHistory())
)

export default function configStore(initialState) {
    const store = createStore(rootReducer, initialState, composeEnhancers(middleware))

    if (module.hot) {
        module.hot.accept('./actions-and-reducers/root-reducer.js', () => {
            const nextRootReducer = require('./actions-and-reducers/root-reducer.js').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
