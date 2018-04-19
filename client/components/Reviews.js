import React from 'react';

export default function Reviews(props) {
  const reviews = props.reviews
  if (reviews.length > 1) {
    return (
      <div className="container" id="single-product-container">
      <h3>Reviews</h3>
			{reviews.map( review => <p key={review.id}>{review.user.email}: {review.content} </p> )}
		</div>
    )
  }
}
