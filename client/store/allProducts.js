// ACTION TYPES

const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_PRODUCTS_BY_NAME = 'GOT_PRODUCTS_BY_NAME'

// INITIAL STATE

const initialProducts = []

// ACTION CREATORS

export const gotAllProducts = products => {
	return {
		type: GOT_ALL_PRODUCTS,
		products
	}
}

export const gotAllProductsByName = products => {
	return {
		type: GOT_PRODUCTS_BY_NAME,
		products
	}
}

// THUNK CREATORS

export const getProductsByName = (productName) => {
	return async dispatch => {
		try {
			const res = await axios.get('/api/products')
			const productsByName = res.data
			const productsArray = productsByName.filter(product => {
				console.log("PROD NAME", productName)
				console.log("PROD TITLE", product.title)
				return productName === product.title
			})
			dispatch(gotAllProductsByName(productsArray))
		} catch (error) {
			// TODO use history method to take user to Error Page
      res.send("The product you're looking for is not available")
		}
	}
}

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
		case GOT_PRODUCTS_BY_NAME:
		  return action.products
		default:
			return state
	}
}
