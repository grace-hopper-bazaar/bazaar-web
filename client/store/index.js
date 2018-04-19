import {createStore, applyMiddleware, combineReducers} from 'redux'
import logger from 'redux-logger'
import thunks from 'redux-thunk'
import axios from 'axios'
import history from '../history'
import user from './user'
import allProducts from './allProducts'

// TODO EVALUATE THE USE OF COMBINED REDUCERS

const reducer = combineReducers({user, allProducts})

const store = createStore(
  reducer,
  applyMiddleware(
    thunks.withExtraArgument({axios, history}),
    logger
  )
)

export default store
export * from './user'
