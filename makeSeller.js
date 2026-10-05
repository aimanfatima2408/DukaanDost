require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./src/models/User");

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const result = await User.updateOne(
            { email: "seller2@test.com" },
            { $set: { role: "seller" } }
        );

        console.log(result);

        await mongoose.disconnect();
    } catch (error) {
        console.error(error);
    }
})();