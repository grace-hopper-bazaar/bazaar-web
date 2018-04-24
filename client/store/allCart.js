// ACTION TYPES

const GOT_ALL_CART = 'GOT_ALL_CART';
const ADD_CART = 'ADD_CART'
const DELETE_CART = 'DELETE_CART'

//INITIAL STATE

const initialCart = []


//ACTION CREATORS

export const gotAllCart = (cart) => {
	return {
		type: GOT_ALL_CART,
		cart
	};
};

export const addedCart = (cart) => {
	return {
		type: ADD_CART,
		cart
	};
};

export const deletedCart = (id) => {
	return {
		type: DELETE_CART,
		id
	};
};
// THUNK CREATORS

export const getAllCart = () => {
	return async (dispatch, _, { axios, history }) => {
		try {
			const res = await axios.get('/api/cart/items');
			const cart = res.data[0].lineitems
			dispatch(gotAllCart(cart));
		} catch (error) {
			history.push('/no-cart');
			console.error('Could not get cart. ', error);
		}
	};
};

export const addCart = (item) => {
	return async (dispatch, _, { axios, history }) => {
		try {
		const {data} =	await axios.post('/api/cart/items', item);
		const action = addedCart(data)
		dispatch(action)
		} catch (error) {
			history.push('/no-product');
			console.error('Could not get cart. ', error);
		}
	};
};

export const deleteCart = (id) => {
	return async (dispatch, _, { axios, history }) => {
		try {
			await axios.delete(`/api/cart/items/${id}`);
			const action = deletedCart(id)
			dispatch(action)
		} catch (error) {
			history.push('/no-product');
			console.error('Could not get cart. ', error);
		}
	};
};

// REDUCER

export default (state = initialCart, action) => {
	switch (action.type) {
		case GOT_ALL_CART:
			return action.cart;
		case ADD_CART:
			return [...state, action.cart]
		case DELETE_CART:
			return [...state].filter(item => item.id !== action.id)
		default:
			return state;
	}
};
