// routes/products.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

//Get all products with reviews
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        console.log('Fetched products:', products); // Add this line to log the result
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Error fetching products', error: err });
    }
});


// Get a single product with reviews by product ID
router.get('/products/:id', async (req, res) => {
    try {
        // Attempt to find the product by its ID
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.json(product);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ message: 'Error fetching product', error: err });
    }
});

// Add a review to a product by product ID
router.post('/products/:id/reviews', async (req, res) => {
    const { userId, rating, comment } = req.body;

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create a new review
        const newReview = {
            userId,
            rating,
            comment,
        };

        // Add the review to the product's reviews array
        product.reviews.push(newReview);
        await product.save();

        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (err) {
        console.error('Error adding review:', err);
        res.status(500).json({ message: 'Error adding review', error: err });
    }
});

module.exports = router;
