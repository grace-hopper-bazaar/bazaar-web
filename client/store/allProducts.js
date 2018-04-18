import axios from 'axios'

// ACTION TYPES

const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'

// INITIAL STATE

const initialProducts = []

// ACTION CREATORS

export const gotAllProducts = products => {
	return {
		type: GOT_ALL_PRODUCTS,
		products
	}
}

// THUNK CREATORS

export const getAllProducts = () => {
	return async dispatch => {
		try {
			const res = await axios.get('/api/products')
			const products = res.data
			dispatch(gotAllProducts(products))
		} catch (error) {
			console.error('Could not get products. ', error)
		}
	}
}

// REDUCER

export default function reducer(state = initialProducts, action) {
	switch (action.type) {
		case GOT_ALL_PRODUCTS:
			return action.products
		default:
			return state
	}
}
