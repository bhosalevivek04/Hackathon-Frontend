import React, { useState, useEffect } from 'react';
import { getMyReviews } from '../../services/reviews';
import './MyReviews.css';

function MyReviews() {
  const [reviews, setReviews] = useState([]);

  const loadMyReviews = async () => {
    const response = await getMyReviews();
    if (response.status === 'success') {
      setReviews(response.data);
    }
  };

  useEffect(() => {
    loadMyReviews();
  }, []);

  return (
    <div className="my-reviews-container">
      <h2>My Reviews</h2>
      {reviews.length === 0 ? (
        <p>You have not written any reviews yet.</p>
      ) : (
        <div className="row">
          {reviews.map((review) => (
            <div key={review.id} className="col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{review.movie.title}</h5>
                  <p className="card-text">Rating: {review.rating} / 5</p>
                  <p className="card-text">{review.review}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Reviewed on: {new Date(review.timestamp).toLocaleDateString()}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyReviews;