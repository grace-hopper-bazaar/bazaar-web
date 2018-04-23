import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCart } from '../store/allCart';
import SingleCartListing from './SingleCartListing';
import SubCartTotal from './SubCartTotal';

class Cart extends Component {
	componentDidMount() {
		this.props.getAllCart();
	}
	render() {
		const cart = this.props.cart;
		return (
			<div className="container">
				<h1>Shopping Cart</h1>
				<div className="row">
					<div className="col">
						<SingleCartListing cart={cart} />
					</div>
					<div className="col">
						<SubCartTotal cart={cart} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = (dispatch) => {
	return {
		getAllCart: () => dispatch(getAllCart())
	};
};

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default ConnectedCart;
