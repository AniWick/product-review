// src/project_sign_up.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css'; // Use the same CSS for styling

function SignupPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send sign-up data to the backend
        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password }),
            });

            const data = await response.json();
            if (response.status === 201) {
                alert('User registered successfully!');
                localStorage.setItem('token', data.token); // Store the token in localStorage
                navigate('/project_login'); // Redirect to login page after successful signup
            } else {
                setError(data.message); // Display error message from the server
            }
        } catch (err) {
            console.error('Error during signup', err);
            setError('An error occurred during signup'); // Generic error message
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="auth-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="auth-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="auth-button">
                    Sign Up
                </button>
            </form>
            <p className="auth-footer">
                Already have an account? <a href="/project_login">Login here</a>
            </p>
        </div>
    );
}

export default SignupPage;
