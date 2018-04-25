// ACTION TYPES

const GOT_ALL_CART = 'GOT_ALL_CART';
const ADD_CART = 'ADD_CART';
const DELETE_CART = 'DELETE_CART';
const UPDATE_CART = 'UPDATE_CART';

//INITIAL STATE

const initialCart = [];

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
export const updatedCart = (cart) => {
	return {
		type: UPDATE_CART,
		cart
	};
};
// THUNK CREATORS

export const getAllCart = () => {
	return async (dispatch, _, { axios, history }) => {
		try {
			const res = await axios.get('/api/cart/items');
			const cart = res.data.lineitems;
			dispatch(gotAllCart(cart));
		} catch (error) {
			history.push('/no-cart');
			console.error('Could not getAll cart. ', error);
		}
	};
};

export const addCart = (item, quant) => {
	return async (dispatch, _, { axios, history }) => {
		try {
			const res = await axios.get('/api/cart/items');
			const cart = res.data.lineitems;
			if (cart.some((li) => li.productId === item.productId)) {
				const { id, quantity } = cart.filter((li) => li.productId === item.productId)[0];

				const { data } = await axios.put(`/api/cart/items/${id}/changeQuantity`, {
					quantity: quantity + quant
				});
				const action = updatedCart(data);
				dispatch(action);
			} else {
				const { data } = await axios.post('/api/cart/items', item);
				const action = addedCart(data);
				dispatch(action);
			}
		} catch (error) {
			history.push('/no-product');
			console.error('Could not add cart. ', error);
		}
	};
};

export const deleteCart = (id) => {
	return async (dispatch, _, { axios, history }) => {
		try {
			await axios.delete(`/api/cart/items/${id}`);
			const action = deletedCart(id);
			dispatch(action);
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
		case UPDATE_CART:
			return [ ...state ].map((item) => {
				if (item.id === action.cart.id) {
					return action.cart;
				} else {
					return item;
				}
			});
		case DELETE_CART:
			return [ ...state ].filter((item) => item.id !== Number(action.id));
		default:
			return state;
	}
};
