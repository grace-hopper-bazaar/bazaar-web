import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunks from 'redux-thunk'
import axios from 'axios'
import history from '../history'
import user from './user'
import products from './allProducts'
import selectedProduct from './selectedProduct'

const reducer = combineReducers({ user, products, selectedProduct })

const store = createStore(
	reducer,
	applyMiddleware(thunks.withExtraArgument({ axios, history }), logger)
)

export default store
export * from './user'
