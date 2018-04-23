import React from 'react';
import StarRating from './StarRating';

export default function Reviews(props) {
	const reviews = props.reviews;
	if (reviews.length > 0) {
		return (
			<div className="container">
					<h3>Reviews</h3>
					{reviews.map((review) => (
						<div className="container" key={review.id}>
							<div className="card row">
								<StarRating rating={review.rating} />

								<p>Date: {review.createdAt.slice(0, 10)}</p>
								<p>{review.user.email}{' : '}{review.content} </p>{' '}
							</div>
						</div>
					))}
				</div>
		);
	} else {
		return (
			<div className="container">
					<h3>Reviews</h3>
				<p>No reviews available</p>
				</div>
		)
	}
}
