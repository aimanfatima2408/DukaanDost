const Order = require("../models/order");
const Product = require("../models/product");

// Create order
const createOrder = async (req, res) => {
    try {
        const {
            items,
            shippingAddress,
            phone,
            paymentMethod
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Order must contain at least one product"
            });
        }

        if (!shippingAddress || !phone) {
            return res.status(400).json({
                message: "Shipping address and phone are required"
            });
        }

        const orderItems = [];
        let totalAmount = 0;

        for (const item of items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.name}`
                });
            }

            const itemTotal = product.price * item.quantity;

            totalAmount += itemTotal;

            orderItems.push({
                product: product._id,
                name: product.name,
                quantity: item.quantity,
                price: product.price,
                size: item.size || "",
                color: item.color || ""
            });

            product.stock -= item.quantity;
            await product.save();
        }

        const order = await Order.create({
            customer: req.user.id,
            items: orderItems,
            totalAmount,
            shippingAddress,
            phone,
            paymentMethod: paymentMethod || "Cash on Delivery"
        });

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Get customer's orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            customer: req.user.id
        })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("customer", "name email")
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.status = status;

        await order.save();

        res.json({
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
};