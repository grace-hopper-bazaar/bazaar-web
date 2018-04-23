// ACTION TYPES

const GOT_ALL_CART = 'GOT_ALL_CART';

//INITIAL STATE

const initialCart = []


//ACTION CREATORS

export const gotAllCart = (cart) => {
	return {
		type: GOT_ALL_CART,
		cart
	};
};

// THUNK CREATORS

export const getAllCart = () => {
	return async (dispatch, _, { axios, history }) => {
		try {
			const res = await axios.get('/api/cart/items');
			const cart = res.data;
			dispatch(gotAllCart(cart));
		} catch (error) {
			history.push('/no-cart');
			console.error('Could not get cart. ', error);
		}
	};
};

// REDUCER

export default (state = initialCart, action) => {
	switch (action.type) {
		case GOT_ALL_CART:
			return action.cart;
		default:
			return state;
	}
};
