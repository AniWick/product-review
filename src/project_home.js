// src/project_home.js
import React from 'react';
import { Link } from 'react-router-dom'; // Link is used to navigate between pages
import './project_home.css';

function HomePage() {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">Product Reviews Platform</h1>
                <p className="home-subtitle">
                    Join our community to discover genuine product reviews and share your experiences.
                    Make informed decisions with real feedback from real users.
                </p>
                <div className="home-buttons">
                    <Link to="/project_login" className="home-button primary-button">
                        Sign In
                    </Link>
                    <Link to="/project_sign_up" className="home-button secondary-button">
                        Join Now
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
