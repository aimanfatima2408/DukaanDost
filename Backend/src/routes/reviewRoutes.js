const express = require("express");

const {
    createReview,
    getProductReviews
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Anyone can view product reviews
router.get("/product/:productId", getProductReviews);

// Only logged-in customers can create reviews
router.post(
    "/",
    protect,
    allowRoles("customer"),
    createReview
);

module.exports = router;