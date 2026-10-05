const Review = require("../models/review");
const Product = require("../models/product");

// Add review
const createReview = async (req, res) => {
    try {
        const {
            product,
            rating,
            comment
        } = req.body;

        if (!product || !rating || !comment) {
            return res.status(400).json({
                message: "Product, rating and comment are required"
            });
        }

        const productExists = await Product.findById(product);

        if (!productExists) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Simple sentiment based on rating
        let sentiment = "neutral";

        if (rating >= 4) {
            sentiment = "positive";
        } else if (rating <= 2) {
            sentiment = "negative";
        }

        const review = await Review.create({
            product,
            customer: req.user.id,
            rating,
            comment,
            sentiment
        });

        res.status(201).json({
            message: "Review added successfully",
            review
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Get reviews for a product
const getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({
            product: req.params.productId
        })
            .populate("customer", "name")
            .sort({ createdAt: -1 });

        res.json(reviews);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    createReview,
    getProductReviews
};