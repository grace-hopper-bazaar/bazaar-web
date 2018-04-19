// ACTION TYPES

const GOT_SELECTED_PRODUCT = 'GOT_SELECTED_PRODUCT'

// INITIAL STATE

const initialProduct = {}

// ACTION CREATORS

export const gotSelectedProduct = product => {
	return {
		type: GOT_SELECTED_PRODUCT,
		product
	}
}

// THUNK CREATORS

export const getSelectedProduct = id => {
	return async (dispatch, _, { axios, history }) => {
		try {
			const res = await axios.get(`/api/products/${id}`)
			const product = res.data
			dispatch(gotSelectedProduct(product))
		} catch (error) {
			history.push('/no-product')
			console.error('Could not get product. ', error)
		}
	}
}

// REDUCER

export default (state = initialProduct, action) => {
	switch (action.type) {
		case GOT_SELECTED_PRODUCT:
			return action.product
		default:
			return state
	}
}
