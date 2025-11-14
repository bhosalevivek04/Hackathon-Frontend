import React, { useState, useEffect } from 'react';
import { allReviews } from '../../services/movies';
import './AllReviews.css';

function AllReviews() {
  const [reviews, setReviews] = useState([]);

  const loadAllReviews = async () => {
    const response = await allReviews();
    if (response.status === 'success') {
      setReviews(response.data);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      await loadAllReviews();
    };
    fetchReviews();
  }, []);

  return (
    <div className="all-reviews-container">
      <h2>All Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
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
                      Reviewed by: {review.reviewerFirstName} {review.reviewerLastName} on {new Date(review.lastUpdated).toLocaleDateString()}
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

export default AllReviews;
