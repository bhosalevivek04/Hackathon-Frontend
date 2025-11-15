import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReviewById, updateReview } from '../../services/reviews';
import './EditReview.css';
import { toast } from 'react-toastify';

function EditReview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadReview = async () => {
            const response = await getReviewById(id);
            if (response.status === 'success') {
                setReview(response.data.review);
                setRating(response.data.rating);
            } else {
                toast.error('Failed to load review');
                navigate('/home/myReviews');
            }
            setLoading(false);
        };
        loadReview();
    }, [id, navigate]);

    const handleUpdateReview = async () => {
        if (review.length === 0) {
            toast.error('Review cannot be empty');
            return;
        }

        const response = await updateReview(id, review, rating);
        if (response.status === 'success') {
            toast.success('Review updated successfully');
            navigate('/home/myReviews');
        } else {
            toast.error('Failed to update review');
        }
    };

    if (loading) return <div className="loading-spinner">Loading review...</div>;

    return (
        <div className="edit-review-container">
            <div className="edit-review-form">
                <h2>Edit Review</h2>
                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <select
                        id="rating"
                        className="form-control"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    >
                        <option value={1}>1 - Poor</option>
                        <option value={2}>2 - Fair</option>
                        <option value={3}>3 - Good</option>
                        <option value={4}>4 - Very Good</option>
                        <option value={5}>5 - Excellent</option>
                        <option value={6}>6 - Great</option>
                        <option value={7}>7 - Outstanding</option>
                        <option value={8}>8 - Masterpiece</option>
                        <option value={9}>9 - Incredible</option>
                        <option value={10}>10 - Perfect</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Your Review</label>
                    <textarea
                        id="review"
                        className="form-control"
                        rows="5"
                        placeholder="Share your updated thoughts..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                </div>
                <button onClick={handleUpdateReview} className="btn btn-primary mt-2">
                    Update Review
                </button>
            </div>
        </div>
    );
}

export default EditReview;
