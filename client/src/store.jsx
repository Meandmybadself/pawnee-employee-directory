import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
import thunk from 'redux-thunk'

export const history = createBrowserHistory()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  createRootReducer(history),
  {},
  composeEnhancer(applyMiddleware(thunk, routerMiddleware(history)))
)

export default store
