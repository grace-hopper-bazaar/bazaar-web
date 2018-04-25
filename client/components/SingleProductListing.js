import React from 'react';
import { NavLink } from 'react-router-dom';
import StarRating from './StarRating';
import { withAlert } from 'react-alert';

function SingleProductListing(props) {
	const product = props.product;
	async function clickHandler(event) {
		event.preventDefault();
		const item = {
			quantity: 1,
			productId: product.id
		};
		await props.addCart(item, 1);
		props.alert.success('Added to cart!');
	}
	return (
		<div className="container" id="single-product-container">
			<div className="card row">
				<NavLink to={`/product/${product.id}`}>
					<img className="card-image-top" src={product.image} />
				</NavLink>
				<h5 className="card-title">{product.title}</h5>
				<p className="card-body">{product.description}</p>
				<StarRating rating={product.rating} showReviewNumber={true} reviews={product.reviews} />
				<div className="price-and-cart">
					<div>
						<p className="card-text">Price: {`$${product.price}.00`}</p>
					</div>

					<div className="details-and-cart">
						<NavLink to={`/product/${product.id}`}>
							<button type="button" className="badge badge-light">
								More Details
							</button>
						</NavLink>

						<button type="button" onClick={clickHandler} className="btn btn-primary">
							{' '}
							Add To Cart{' '}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default withAlert(SingleProductListing);
