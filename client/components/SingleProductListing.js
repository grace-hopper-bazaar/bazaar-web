
import React from 'react'
import { NavLink } from 'react-router-dom'
import StarRating from './StarRating'
import { withAlert } from 'react-alert';

export default function SingleProductListing(props) {
  const product = props.product
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
    <div id="single-product-container">
      <div className="card border-warning mb-3">
        <div className="card-header">
          <h4 className="card-title">{product.title}</h4>
        </div>
        <div className="card-body" id="product-img">
          <NavLink to={`/product/${product.id}`}>
            <img className="card-image-top product" src={product.image} />
          </NavLink>
        </div>
        <h5 className="card-text">{product.description}</h5>
        <p className="card-text price">Price: {`$${product.price}.00`}</p>
        <div className="bottom">
          <div id="rating">
            <StarRating
              rating={product.rating}
              showReviewNumber={true}
              reviews={product.reviews}
            />
          </div>
          <button
            type="button"
            onClick={clickHandler}
            className="btn btn-outline-warning"
            id="single-add">
            {' '}
            Add To Cart{' '}
          </button>
        </div>
      </div>
    </div>
  )

}

export default withAlert(SingleProductListing);
