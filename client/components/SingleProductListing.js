import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SingleProductListing(props) {
	const product = props.product
	return (
		<div className="container" id="single-product-container">
			<div className="card row">
				<NavLink to={`/product/${product.id}`}>
					<img className="card-image-top" src={product.image} />
				</NavLink>
				<h5 className="card-title">{product.title}</h5>
				<p className="card-body">{product.description}</p>
				{/* <p>Star Rating: {product.rating}</p> */}
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

						<button type="button" className="btn btn-primary">
							{' '}
							Add To Cart{' '}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
