const express = require("express");

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Anyone can view products
router.get("/", getProducts);
router.get("/:id", getProductById);

// Only seller can create products
router.post(
    "/",
    protect,
    allowRoles("seller"),
    createProduct
);

// Only seller can update products
router.put(
    "/:id",
    protect,
    allowRoles("seller"),
    updateProduct
);

// Only seller can delete products
router.delete(
    "/:id",
    protect,
    allowRoles("seller"),
    deleteProduct
);

module.exports = router;