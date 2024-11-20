const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Product = require('./models/Product');  // Import Product model

const app = express();
const PORT = 5000;

app.use(express.json());  // To parse JSON bodies
app.use(cors());          // Enable Cross-Origin Requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/product_reviews', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from 'Authorization' header

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.userId = decoded.userId; // Attach userId to the request object
        next();
    });
};

// User Registration Route
app.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ fullName, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});

// User Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token }); // Send token to the client
});

// Fetch all products (including image URLs)
app.get('/products', authenticateToken, async (req, res) => { // Protected route
    try {
        const products = await Product.find();  // Fetch all products from the database
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
});

// Fetch reviews for a specific product
app.get('/products/:id/reviews', authenticateToken, async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Send the reviews back to the client
        res.json({ reviews: product.reviews });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching reviews', error: err.message });
    }
});


// Add a new review to a product
app.post('/products/:id/reviews', authenticateToken, async (req, res) => { // Protected route
    const { rating, comment } = req.body;
    const productId = req.params.id;

    // Ensure all required fields are provided
    if (!rating || !comment) {
        return res.status(400).json({ message: 'Rating and comment are required' });
    }

    try {
        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create a review object with the user ID (from the token) and other data
        const review = {
            userId: req.userId,  // Use the user ID from the JWT token
            rating,
            comment,
            createdAt: new Date(),
        };

        // Add the review to the product's reviews array
        product.reviews.push(review);

        // Save the updated product
        await product.save();

        res.status(201).json({ message: 'Review added successfully', review });
    } catch (err) {
        res.status(500).json({ message: 'Error adding review', error: err.message });
    }
});

// Fetch user profile data
app.get('/user/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user data (excluding password)
        res.json({
            fullName: user.fullName,
            email: user.email,
            createdAt: user.createdAt,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user data', error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
