import React from 'react'

export default function StarRating(props) {
  const stars = [0, 0, 0, 0, 0]
  let key = 0
  stars.fill(1, 0, props.rating)
  if (!props.rating) {
    return <p>No reviews yet</p>
  } else if (props.showReviewNumber) {
    return (
      <p>
        Rating:{' '}
        {stars.map(star => {
          if (star === 1) {
            return <span key={key++} className="fas fa-star" />
          } else {
            return <span key={key++} className="far fa-star" />
          }
        })}{' '}
        {props.reviews.length}
        {' reviews'}
      </p>
    )
  } else {
    return (
      <p>
        Rating:{' '}
        {stars.map(star => {
          if (star === 1) {
            return <span key={key++} className="fas fa-star" />
          } else {
            return <span key={key++} className="far fa-star" />
          }
        })}
      </p>
    )
  }
}
