import React, { useState, useEffect } from 'react';
import { getSharedReviews } from '../../services/reviews';
import './SharedWithMe.css';

function SharedWithMe() {
  const [reviews, setReviews] = useState([]);

  const loadSharedReviews = async () => {
    const response = await getSharedReviews();
    if (response.status === 'success') {
      setReviews(response.data);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      await loadSharedReviews();
    };
    fetchReviews();
  }, []);

  return (
    <div className="shared-with-me-container">
      <h2>Reviews Shared With Me</h2>
      {reviews.length === 0 ? (
        <p>No reviews shared with you yet.</p>
      ) : (
        <div className="row">
          {reviews.map((review) => (
            <div key={review.id} className="col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{review.movieTitle}</h5>
                  <p className="card-text">Rating: {review.rating} / 10</p>
                  <p className="card-text">{review.review}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Shared by: {review.reviewerFirstName} {review.reviewerLastName} on {new Date(review.lastUpdated).toLocaleDateString()}
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

export default SharedWithMe;
