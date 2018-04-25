import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedProduct } from '../store/selectedProduct';
import { addCart } from '../store/allCart';
import StarRating from './StarRating';
import Reviews from './Reviews';

class ProductDetails extends Component {
	constructor() {
		super()
		this.clickHandler = this.clickHandler.bind(this)
	}
	componentDidMount() {
		this.props.getSelectedProduct(this.props.match.params.id);
	}

	async clickHandler(event) {
		event.preventDefault();
		const item = {
			quantity: 1,
			productId: this.props.selectedProduct.id
		};
		await this.props.addCart(item, 1);
	}
	render() {
		const product = this.props.selectedProduct;
		return product.title ? (
			<div id="product-details-container">
				<div className="details-image">
					<img src={`/${product.image}`} />
				</div>
				<div className="product-details">
					<h1>{product.title}</h1>
					<h3>{`$${product.price}.00`}</h3>
					<button type="button" onClick={this.clickHandler} className="btn btn-default">
						Add To Cart
					</button>
					<StarRating rating={product.rating} showReviewNumber={true} reviews={product.reviews} />
					<h3>Description</h3>
					<p>{product.description}</p>
					<Reviews reviews={product.reviews} rating={product.rating} />
				</div>
			</div>
		) : (
			<p>Loading...</p>
		);
	}
}

const mapStateToProps = ({ selectedProduct }) => ({ selectedProduct });
const mapDispatchToProps = (dispatch) => {
	return {
		getSelectedProduct: (id) => dispatch(getSelectedProduct(id)),
		addCart: (item, quant) => dispatch(addCart(item, quant))
	};
};

const ConnectedProductDetails = connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

export default ConnectedProductDetails;
