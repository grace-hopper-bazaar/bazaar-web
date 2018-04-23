import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunks from 'redux-thunk'
import axios from 'axios'
import history from '../history'
import user from './user'
import products from './allProducts'
import selectedProduct from './selectedProduct'
import filters from './filters'
import cart from './allCart'

const reducer = combineReducers({ user, products, selectedProduct, filters, cart })

const store = createStore(
	reducer,
	applyMiddleware(thunks.withExtraArgument({ axios, history }), logger)
)

export default store
