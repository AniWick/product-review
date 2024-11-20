import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductReviewsPage.css';

function ProductReviewsPage() {
    const { productId } = useParams(); // Get productId from the URL
    const [reviews, setReviews] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [newReview, setNewReview] = useState({ rating: '', comment: '' }); 
    const navigate = useNavigate(); 

    useEffect(() => {
        // Fetch product reviews
        const fetchReviews = async () => {
            setLoading(true); 
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/project_login');
                return;
            }

            try {
                // Correct URL interpolation using backticks
                const response = await fetch(`http://localhost:5000/products/${productId}/reviews`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }

                const data = await response.json();
                setReviews(data.reviews); // Set reviews in state
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchReviews();
    }, [productId, navigate]);

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prevReview) => ({
            ...prevReview,
            [name]: value,
        }));
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to submit a review.');
            return;
        }

        const userId = JSON.parse(atob(token.split('.')[1])).userId; // Decode userId from token
        const reviewData = {
            userId,
            rating: parseInt(newReview.rating),
            comment: newReview.comment,
        };

        try {
            // Correct URL interpolation using backticks
            const response = await fetch(`http://localhost:5000/products/${productId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(reviewData),
            });

            const data = await response.json();
            if (response.ok) {
                setReviews((prevReviews) => [...prevReviews, data.review]); // Add new review to state
                setNewReview({ rating: '', comment: '' }); // Reset form
                alert('Review added successfully!');
            } else {
                console.error('Error adding review:', data.message);
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    return (
        <div className="product-reviews-page">
            <h1>Product Reviews</h1>

            {/* Go Back Button */}
            <button onClick={() => navigate('/main')} className="go-back-btn">
                Go Back
            </button>

            {/* Loading state */}
            {loading ? (
                <p>Loading reviews...</p>
            ) : (
                <div>
                    {/* Show reviews */}
                    {reviews.length > 0 ? (
                        <div className="reviews">
                            {reviews.map((review, index) => (
                                <div key={index} className="review">
                                    <p><strong>Rating:</strong> {review.rating} / 5</p>
                                    <p>{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No reviews yet for this product.</p>
                    )}

                    {/* Add Review Form */}
                    <form onSubmit={handleReviewSubmit}>
                        <div>
                            <label>Rating (1-5):</label>
                            <input
                                type="number"
                                name="rating"
                                value={newReview.rating}
                                onChange={handleReviewChange}
                                min="1"
                                max="5"
                                required
                            />
                        </div>
                        <div>
                            <label>Comment:</label>
                            <textarea
                                name="comment"
                                value={newReview.comment}
                                onChange={handleReviewChange}
                                required
                            />
                        </div>
                        <button type="submit">Submit Review</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ProductReviewsPage;
