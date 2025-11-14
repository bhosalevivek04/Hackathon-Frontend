import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addReview } from '../../services/reviews';
import './AddReview.css';
import { toast } from 'react-toastify';

function AddReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);

  const handleAddReview = async () => {
    if (review.length === 0) {
      toast.error('Review cannot be empty');
      return;
    }

    const response = await addReview(id, review, rating);
    if (response.status === 'success') {
      toast.success('Review added successfully');
      navigate('/home/myReviews');
    } else {
      toast.error('Failed to add review');
    }
  };

  return (
    <div className="add-review-container">
      <h2>Add Review</h2>
      <div className="form-group">
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          className="form-control"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="review">Your Review</label>
        <textarea
          id="review"
          className="form-control"
          rows="5"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </div>
      <button onClick={handleAddReview} className="btn btn-primary mt-2">
        Submit Review
      </button>
    </div>
  );
}

export default AddReview;