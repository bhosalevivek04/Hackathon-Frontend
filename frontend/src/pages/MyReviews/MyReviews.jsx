import React, { useState, useEffect } from 'react';
import { getMyReviews, deleteReview } from '../../services/reviews';
import './MyReviews.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const loadMyReviews = async () => {
    const response = await getMyReviews();
    if (response.status === 'success') {
      setReviews(response.data);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      await loadMyReviews();
    };
    fetchReviews();
  }, []);

  const handleEdit = (reviewId) => {
    navigate(`/home/edit-review/${reviewId}`);
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const response = await deleteReview(reviewId);
      if (response.status === 'success') {
        toast.success('Review deleted successfully');
        loadMyReviews();
      } else {
        toast.error('Failed to delete review');
      }
    }
  };

  const handleShare = (reviewId) => {
    navigate(`/home/share-review/${reviewId}`);
  };

  return (
    <div className="my-reviews-container">
      <h2>My Reviews</h2>
      {reviews.length === 0 ? (
        <p className="no-reviews">You have not written any reviews yet.</p>
      ) : (
        <div className="row">
          {reviews.map((review) => (
            <div key={review.id} className="col-md-12 mb-4">
              <div className="review-card">
                <div className="card-body">
                  <h5 className="card-title">{review.movieTitle}</h5>
                  <p className="rating">Rating: {review.rating} / 10</p>
                  <p className="review-text">{review.review}</p>
                  <p className="review-date">
                    <small>
                      Reviewed on: {new Date(review.lastUpdated).toLocaleDateString()}
                    </small>
                  </p>
                  <div className="btn-group">
                    <button onClick={() => handleEdit(review.id)} className="btn btn-secondary">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(review.id)} className="btn btn-danger">
                      Delete
                    </button>
                    <button onClick={() => handleShare(review.id)} className="btn btn-info">
                      Share
                    </button>
                  </div>
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
