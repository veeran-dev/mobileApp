import { createStore, applyMiddleware } from 'redux'
import reducers from './Reducers'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

// applyMiddleware supercharges createStore with middleware
let store = createStore(reducers, applyMiddleware(thunkMiddleware, promiseMiddleware()))

export default store
