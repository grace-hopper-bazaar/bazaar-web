import React from 'react';

export default function StarRating(props) {
	const stars = [ 0, 0, 0, 0, 0 ];
	let key = 0;
	stars.fill(1, 0, props.rating);
	if (!props.rating) {
		return <p className="card-body">No reviews yet</p>;
	} else {
		return (
			<p className="card-body">
				Rating:{' '}
				{stars.map((star) => {
					if (star === 1) {
						return <span key={key++} className="fas fa-star" />;
					} else {
						return <span key={key++} className="far fa-star" />;
					}
				})}
			</p>
		);
	}
}
