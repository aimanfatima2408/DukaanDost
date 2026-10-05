const express = require("express");

const {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Customer creates an order
router.post(
    "/",
    protect,
    allowRoles("customer"),
    createOrder
);

// Customer views their own orders
router.get(
    "/my-orders",
    protect,
    allowRoles("customer"),
    getMyOrders
);

// Seller views all orders
router.get(
    "/",
    protect,
    allowRoles("seller"),
    getAllOrders
);

// Seller updates order status
router.put(
    "/:id/status",
    protect,
    allowRoles("seller"),
    updateOrderStatus
);

module.exports = router;