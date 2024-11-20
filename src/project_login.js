// src/project_login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send login data to the backend
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.status === 200) {
                alert('Login successful!');
                // Store token in localStorage (use "token" as the key for consistency)
                localStorage.setItem('token', data.token); 
                navigate('/main'); // Redirect to main page after successful login
            } else {
                setError(data.message); // Display error message from the server
            }
        } catch (err) {
            console.error('Error during login', err);
            setError('An error occurred during login'); // Generic error message
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>} {/* Display error if present */}
            <form className="auth-form" onSubmit={handleSubmit}>
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
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
