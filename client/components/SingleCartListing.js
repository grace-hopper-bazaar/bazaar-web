import React, { Component } from 'react';
import { getAllCart, deleteCart, addCart } from '../store/allCart';
import { connect } from 'react-redux';
import SingleCartRow from './SingleCartRow'
import { withRouter } from 'react-router'
import SubCartTotal from './SubCartTotal'

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
		return (
			<div>
				<div>
				{cart.map(item => <SingleCartRow cart={item} key={item.id} deleteCart={this.props.deleteCart} addCart={this.props.addCart} />)}
				</div>
				
				<SubCartTotal cart={cart} />
				
				</div>
		)
	}
}

const mapStateToProps = ({ cart }) => ({ cart });
const mapDispatchToProps = (dispatch) => {
	return {
		getAllCart: () => dispatch(getAllCart()),
		deleteCart: (id) => dispatch(deleteCart(id)),
		addCart: (item, quant) => dispatch(addCart(item, quant))
	};
};

const ConnectedSingleCartListing = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCartListing));

export default ConnectedSingleCartListing
