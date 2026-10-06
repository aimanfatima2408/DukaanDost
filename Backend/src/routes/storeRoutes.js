const express = require("express");

const {
    getSettings,
    updateSettings
} = require("../controllers/storeController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Anyone can view store settings
router.get("/", getSettings);

// Only seller can update store settings
router.put(
    "/",
    protect,
    allowRoles("seller"),
    updateSettings
);

module.exports = router;