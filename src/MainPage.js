// src/MainPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/project_login');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/products', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                const updatedProducts = data.map(product => ({
                    ...product,
                    reviews: product.reviews || [],
                }));
                setProducts(updatedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [navigate]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Navigate to the ProductReviewsPage
    const goToProductReviewsPage = (productId) => {
        navigate(`/products/${productId}`); // Dynamic route to product reviews page
    };

    return (
        <div className="main-page">
            <div className="nav-bar">
                <button onClick={() => navigate('/help')}>Help</button>
                <button onClick={() => navigate('/contact')}>Contact</button>
                <button onClick={() => navigate('/about')}>About</button>
                <button onClick={() => navigate('/profile')}>Profile</button>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <h1>Welcome to the Product Store</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="product-box">
                <h2>Products</h2>
                <div className="products">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <div key={product._id} className="product-item">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                                {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="product-image" />}
                                <button className="add-review-btn" onClick={() => goToProductReviewsPage(product._id)}>Add Review</button>
                                <button className="view-reviews-btn" onClick={() => goToProductReviewsPage(product._id)}>View Reviews</button>
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MainPage;
