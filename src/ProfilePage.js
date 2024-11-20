import React, { useEffect, useState } from 'react';
//import { format } from 'date-fns'; // Optional for custom formatting
import './ProfilePage.css';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);  // To hold error message

    useEffect(() => {
        // Get the token from localStorage
        const token = localStorage.getItem('token'); 

        if (!token) {
            setError('You are not logged in'); // Set error message if no token found
            return;
        }

        // Fetch user profile
        fetch('http://localhost:5000/user/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Send token in Authorization header
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch profile data');
            }
            return response.json();
        })
        .then(data => {
            setUser(data); // Set user profile data
            setError(null); // Clear error if successful
        })
        .catch(err => {
            setError('You are not logged in or your session has expired'); // Handle error
            console.error(err);
        });
    }, []);

    if (error) {
        return (
            <div className="profile-page">
                <h1>{error}</h1>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <h1>Your Profile</h1>
            {user ? (
                <>
                    <p><strong>Name:</strong> {user.fullName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* <p><strong>Joined:</strong> {user.createdAt ? format(new Date(user.createdAt), 'MMMM dd, yyyy') : 'No date available'}</p> */}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProfilePage;
