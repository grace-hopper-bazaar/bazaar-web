import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSelectedProduct } from '../store/selectedProduct'
import StarRating from './StarRating'
import Reviews from './Reviews'

class ProductDetails extends Component {
	componentDidMount() {
		this.props.getSelectedProduct(this.props.match.params.id)
	}
	render() {
		const product = this.props.selectedProduct
		return product.title ? (
			<div id="product-details-container">
				<div className="details-image">
					<img src={`/${product.image}`} />
				</div>
				<div className="product-details">
					<h1>{product.title}</h1>
					<h3>{`$${product.price}.00`}</h3>
					<button type="button" className="btn btn-default">
						Add To Cart
					</button>
					<StarRating rating={product.rating} />
					<h3>Description</h3>
					<p>{product.description}</p>
					<Reviews reviews={product.reviews} />
				</div>
			</div>
		) : (
			<p>Loading...</p>
		)
	}
}

const mapStateToProps = ({ selectedProduct }) => ({ selectedProduct })
const mapDispatchToProps = dispatch => {
	return { getSelectedProduct: id => dispatch(getSelectedProduct(id)) }
}

const ConnectedProductDetails = connect(mapStateToProps, mapDispatchToProps)(
	ProductDetails
)

export default ConnectedProductDetails
