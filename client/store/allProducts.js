// ACTION TYPES

const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const FILTER_PRODUCTS_BY_NAME = 'FILTER_PRODUCTS_BY_NAME'

// INITIAL STATE

const initialProducts = []

// ACTION CREATORS

export const gotAllProducts = products => {
	return {
		type: GOT_ALL_PRODUCTS,
		products
	}
}

export const filterProductsByName = searchString => {
	return {
		type: FILTER_PRODUCTS_BY_NAME,
		searchString
	}
}

// THUNK CREATORS

export const getAllProducts = () => {
	return async (dispatch, _, { axios, history }) => {
		try {
			const res = await axios.get('/api/products')
			const products = res.data
			dispatch(gotAllProducts(products))
		} catch (error) {
			history.push('/no-products')
			console.error('Could not get products. ', error)
		}
	}
}

// REDUCER

export default (state = initialProducts, action) => {
	switch (action.type) {
		case GOT_ALL_PRODUCTS:
			return action.products
		// case FILTER_PRODUCTS_BY_NAME: {
		// 	const filteredProducts = state.filter(product =>
		// 		product.title.includes(action.searchString)
		// 	)
		// 	return filteredProducts
		// }
		default:
			return state
	}
}
