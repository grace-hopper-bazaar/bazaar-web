import React from 'react';

export default function SingleCartListing(props) {
	const cart = props.cart;
	const itemsTotal = cart.reduce((acc, curr) => {
		return acc + curr.price * curr.quantity;
	}, 0);

	return (
		<div className="card">
			<div className="card-title">
				<h3>Total</h3>
			</div>
			<div className="card-body">
				<h4>${itemsTotal}.00</h4>
			</div>
			<button type="button" className="btn btn-primary">
				{' '}
				Proceed to Checkout{' '}
			</button>
		</div>
	);
}
