const mongoose = require("mongoose");

const storeSettingsSchema = new mongoose.Schema(
    {
        storeName: {
            type: String,
            default: "DukaanDost"
        },

        city: {
            type: String,
            default: "Faisalabad"
        },

        whatsappNumber: {
            type: String,
            default: ""
        },

        deliveryPolicy: {
            type: String,
            default: "Cash on Delivery available across Pakistan."
        },

        faqs: [
            {
                question: {
                    type: String,
                    required: true
                },

                answer: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("StoreSettings", storeSettingsSchema);