import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllUsersForSharing, shareReview } from '../../services/reviews';
import './ShareReview.css';
import { toast } from 'react-toastify';

function ShareReview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            const response = await getAllUsersForSharing();
            if (response.status === 'success') {
                setUsers(response.data);
            } else {
                toast.error('Failed to load users');
            }
            setLoading(false);
        };
        loadUsers();
    }, []);

    const handleUserSelect = (userId) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleShare = async () => {
        if (selectedUsers.length === 0) {
            toast.error('Please select at least one user to share with');
            return;
        }

        const response = await shareReview(id, selectedUsers);
        if (response.status === 'success') {
            toast.success('Review shared successfully');
            navigate('/home/myReviews');
        } else {
            toast.error('Failed to share review');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="share-review-container">
            <h2>Share Review</h2>
            <p>Select users to share this review with:</p>
            <div className="users-list">
                {users.map((user) => (
                    <div key={user.id} className="user-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleUserSelect(user.id)}
                            />
                            {user.firstName} {user.lastName} ({user.email})
                        </label>
                    </div>
                ))}
            </div>
            <button onClick={handleShare} className="btn btn-primary mt-2">
                Share Review
            </button>
        </div>
    );
}

export default ShareReview;
