export function ReviewPoints({ reviews }) {

  const ratePoints = reviews.reduce((acc, { rate }) => {
    for (const key in rate) {
      acc[key] += rate[key]
    }
    return acc
  }, {
    cleanliness: 0,
    communication: 0,
    checkin: 0,
    accuracy: 0,
    value: 0,
    location: 0,
  })
  return (<div className="reviews-points-container">

    <div className="flex space-between">
      <p>Cleanliness</p>
      <div className="flex full-bar align-center">
        <div className="review-point-bar">
          <div style={{ width: `${ratePoints.cleanliness / reviews.length / 5 * 100}%` }} className="review-point-inner-bar"></div>
        </div>{(ratePoints.cleanliness / reviews.length).toFixed(1)}
      </div>
    </div>
    <div className="flex space-between">
      <p>Communication</p>
      <div className="flex full-bar align-center">
        <div className="review-point-bar">
          <div style={{ width: `${ratePoints.communication / reviews.length / 5 * 100}%` }} className="review-point-inner-bar"></div>
        </div>{(ratePoints.communication / reviews.length).toFixed(1)}
      </div>
    </div>
    <div className="flex space-between">
      <p>Check-in</p>
      <div className="flex full-bar align-center">
        <div className="review-point-bar">
          <div style={{ width: `${ratePoints.checkin / reviews.length / 5 * 100}%` }} className="review-point-inner-bar"></div>
        </div>{(ratePoints.checkin / reviews.length).toFixed(1)}
      </div>
    </div>
    <div className="flex space-between">
      <p>Accuracy</p>
      <div className="flex full-bar align-center">
        <div className="review-point-bar">
          <div style={{ width: `${ratePoints.accuracy / reviews.lengt / 5 * 100} % ` }} className="review-point-inner-bar"></div>
        </div>{(ratePoints.accuracy / reviews.length).toFixed(1)}
      </div>
    </div>
    <div className="flex space-between">
      <p>Location</p>
      <div className="flex full-bar align-center">
        <div className="review-point-bar">
          <div style={{ width: `${ratePoints.location / reviews.length / 5 * 100}%` }} className="review-point-inner-bar"></div>
        </div>{(ratePoints.location / reviews.length).toFixed(1)}</div>
    </div>
    <div className="flex space-between">
      <p>Value</p>
      <div className="flex full-bar align-center"><div className="review-point-bar">
        <div style={{ width: `${ratePoints.location / reviews.length / 5 * 100}%` }} className="review-point-inner-bar"></div>
      </div>{(ratePoints.value / reviews.length).toFixed(1)}
      </div>
    </div>
  </div>
  )
}