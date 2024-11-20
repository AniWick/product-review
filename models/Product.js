const mongoose = require('mongoose');

// Define the review schema
const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model for user reference
        required: true, // Each review needs to be tied to a user
    },
    rating: {
        type: Number,
        required: true,
        min: 1, // Rating should be between 1 and 5
        max: 5,
    },
    comment: {
        type: String,
        required: true,
        maxLength: 500, // Limit the comment length
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default to the current date if not provided
    },
});

// Define the product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure the product name is unique
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000, // Limit the description length
    },
    price: {
        type: Number,
        required: true, // Price is mandatory
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Beauty', 'Toys', 'Sports'], // Enum restricts category values to a set list
    },
    imageUrl: {
        type: String,
        required: false, // The image URL is optional
    },
    reviews: [reviewSchema], // An array of reviews (each review follows the reviewSchema)
    createdAt: {
        type: Date,
        default: Date.now, // Default to current date when the product is created
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Default to current date when the product is created
    },
});

// Automatically update the `updatedAt` field whenever a product is modified
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now(); // Update the `updatedAt` field before saving
    next();
});

// Create a Product model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
