// ACTION TYPES

const GOT_ALL_CART = 'GOT_ALL_CART';

//INITIAL STATE

const initialCart = 
[
		{
			id: 1,
			name: 'Chocolate1',
			price: 20,
			quantity: 2
		},
		{
			id: 2,
			name: 'Chocolate2',
			price: 25,
			quantity: 4
		},
		{
			id: 3,
			name: 'Chocolate3',
			price: 5,
			quantity: 5
		},
		{
			id: 4,
			name: 'Chocolate4',
			price: 100,
			quantity: 1
		}
	]


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
			// const res = await axios.get('/api/cart');
			// const cart = res.data;
			dispatch(gotAllCart(initialCart));
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
