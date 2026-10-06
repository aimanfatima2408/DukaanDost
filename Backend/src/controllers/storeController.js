const StoreSettings = require("../models/StoreSettings");

// Get store settings
const getSettings = async (req, res) => {
    try {
        let settings = await StoreSettings.findOne();

        if (!settings) {
            settings = await StoreSettings.create({});
        }

        res.json(settings);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Update store settings
const updateSettings = async (req, res) => {
    try {
        let settings = await StoreSettings.findOne();

        if (!settings) {
            settings = await StoreSettings.create(req.body);
        } else {
            settings = await StoreSettings.findOneAndUpdate(
                {},
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );
        }

        res.json({
            message: "Store settings updated successfully",
            settings
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    getSettings,
    updateSettings
};