const express = require("express");

const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");
const router = express.Router();

// Get customer's cart
router.get("/", protect, getCart);

// Add product to cart
router.post("/add", protect, addToCart);

// Update product quantity
router.put("/update/:productId", protect, updateCartItem);

// Remove product from cart
router.delete("/remove/:productId", protect, removeFromCart);

module.exports = router;