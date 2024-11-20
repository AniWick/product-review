// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './project_home';
import LoginPage from './project_login';
import SignupPage from './project_sign_up';
import MainPage from "./MainPage";
import HelpPage from './HelpPage';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';
import ProfilePage from './ProfilePage';
import ProductReviewsPage from './ProductReviewsPage'; // Import the new page
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/project_login" element={<LoginPage />} />
                    <Route path="/project_sign_up" element={<SignupPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/products/:productId" element={<ProductReviewsPage />} /> {/* New Route for Product Reviews */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
