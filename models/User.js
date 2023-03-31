const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["farmer", "wholeseller"],
    },
    userInfo: {
        name: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        phone: {
            type: String,
        },
    },
})

const User = mongoose.model("User", userSchema);

module.exports = User;