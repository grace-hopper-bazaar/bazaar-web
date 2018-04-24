import React, { Component } from 'react';
import { getAllCart, deleteCart } from '../store/allCart';
import { connect } from 'react-redux';

class SingleCartListing extends Component {
	constructor() {
		super();
		this.clickHandler = this.clickHandler.bind(this);
	}

	componentDidMount() {
		this.props.getAllCart();
	}

	async clickHandler(event) {
		event.preventDefault()
		await this.props.deleteCart(event.target.id);
	}
	render() {
		const cart = this.props.cart
		console.log(cart)
		if (cart.length > 0) {
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
								<h5>{item.title}</h5>
							</div>
							<div className="col">
								<p> ${item.price}.00 </p>
							</div>
							<div className="col">
								<input type="text" className="form-control" defaultValue={item.quantity} width="20px" />
							</div>
							<div className="col">
								<button
									type="button"
									onClick={this.clickHandler}
									id={item.id}
									className="badge badge-warning"
								>
									Remove
								</button>
							</div>
						</div>
					))}
				</div>
			);
		} else {
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
					<h5>No items in cart</h5>
				</div>
			);
		}
	}
}

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = (dispatch) => {
	return {
		getAllCart: () => dispatch(getAllCart()),
		deleteCart: (id) => dispatch(deleteCart(id))
	};
};

const ConnectedSingleCartListing = connect(mapStateToProps, mapDispatchToProps)(SingleCartListing);

export default ConnectedSingleCartListing
