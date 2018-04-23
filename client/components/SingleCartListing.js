import React from 'react';

export default function SingleCartListing(props) {
	const cart = props.cart;
	return (
		<div className="container">
			<div className="card row">
				<div className="col">
					<h3>Product Name</h3>
				</div>
				<div className="col">
					<h3>Price</h3>
				</div>
				<div className="col">
					<h3>Quantity</h3>
				</div>
        <div className="col">
					<h3>Remove</h3>
				</div>
			</div>
			{cart.map((item) => (
				<div className="card row" key={item.id}>
					<div className="col">
						<h5>{item.name}</h5>
					</div>
					<div className="col">
						<p> ${item.price}.00 </p>
					</div>
					<div className="col">
          <input type="text" className="form-control" defaultValue={item.quantity} width="20px" />
					</div>
          <div className="col">
					<button type="button" className="badge badge-warning">
								Remove
							</button>
					</div>
				</div>
			))}
		</div>
	);
}
