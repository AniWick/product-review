// src/ContactPage.js
import React from 'react';
import './ContactPage.css';

function ContactPage() {
    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
            <p>If you have any questions, feel free to contact us:</p>
            <ul>
                <li>Email: support@productstore.com</li>
                <li>Phone: +91-9669845762</li>
                <li>Address: PES University,Banashankari,Bengaluru,Karnataka</li>
            </ul>
        </div>
    );
}

export default ContactPage;
