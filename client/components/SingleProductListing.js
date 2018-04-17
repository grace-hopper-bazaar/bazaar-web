import React from 'react'

export default function SingleProductListing(props) {
  const product = props.product
  return (
    <div>
      <div>
        <img src={product.imageUrl} />
        <h5>{product.title}</h5>
        <p>{product.description}</p>
        <p>Price: {product.price}</p>
        <p>Star Rating: {product.rating}</p>
      </div>
      <div>
        <div>
          <button> More Details </button>
        </div>
        <div>
          <button> Add To Cart </button>
        </div>
      </div>
    </div>
  )
}
