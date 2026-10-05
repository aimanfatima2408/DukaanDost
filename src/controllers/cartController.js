const Cart = require("../models/cart");

// Get customer's cart
const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            customer: req.user.id
        }).populate("items.product");

        // If customer has no cart yet
        if (!cart) {
            cart = await Cart.create({
                customer: req.user.id,
                items: []
            });
        }

        res.json(cart);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Add product to cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required"
            });
        }

        const itemQuantity = quantity || 1;

        let cart = await Cart.findOne({
            customer: req.user.id
        });

        // Create cart if it doesn't exist
        if (!cart) {
            cart = await Cart.create({
                customer: req.user.id,
                items: [
                    {
                        product: productId,
                        quantity: itemQuantity
                    }
                ]
            });

            return res.status(201).json({
                message: "Product added to cart",
                cart
            });
        }

        // Check if product is already in cart
        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += itemQuantity;
        } else {
            cart.items.push({
                product: productId,
                quantity: itemQuantity
            });
        }

        await cart.save();

        res.json({
            message: "Product added to cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Update cart item quantity
const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        const cart = await Cart.findOne({
            customer: req.user.id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        item.quantity = quantity;

        await cart.save();

        res.json({
            message: "Cart updated successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Remove product from cart
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({
            customer: req.user.id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        res.json({
            message: "Product removed from cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
};