import React from 'react'

export default function SingleProductListing(props) {
  const product = props.product
  return (
    <div className='container'>
      <div className='card row'>
        <img className='card-image-top' src={product.image} />
        <h5 className='card-title'>{product.title}</h5>
        <p className='card-body'>{product.description}</p>
        <p className='card-text'>Price: {product.price}</p>
        {/* <p>Star Rating: {product.rating}</p> */}
      </div>
      <div>
        <div>
          <button className='badge badge-light'> More Details </button>
        </div>
        <div>
          <button className='btn btn-primary'> Add To Cart </button>
        </div>
      </div>
    </div>
  )
}
