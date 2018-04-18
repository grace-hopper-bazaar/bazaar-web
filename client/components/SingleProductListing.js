import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SingleProductListing(props) {
	const product = props.product
	return (
		<div className="container">
			<div className="card row">
				<NavLink to={`/product/${product.id}`}>
					<img className="card-image-top" src={product.image} />
				</NavLink>
				<h5 className="card-title">{product.title}</h5>
				<p className="card-body">{product.description}</p>
				<p className="card-text">Price: {product.price}</p>
				{/* <p>Star Rating: {product.rating}</p> */}
			</div>
			<div>
				<div>
					<NavLink to={`/product/${product.id}`}>
						<button type="button" className="badge badge-light">
							More Details
						</button>
					</NavLink>
				</div>
				<div>
					<button type="button" className="btn btn-primary">
						{' '}
						Add To Cart{' '}
					</button>
				</div>
			</div>
		</div>
	)
}
