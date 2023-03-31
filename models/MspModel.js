const mongoose = require("mongoose");

const MspModel = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    crop: {
        type: String,
        required: true,
    },
    year: {
        "2019_20": {
            type: String,
        },
        "2020_21": {
            type: String,
        },
        "2021_22": {
            type: String,
        },
        "2022_23": {
            type: String,
        },
    },
    increase: {
        "2020_21": {
            type: String,
        },
        "2021_22": {
            type: String,
        },
        "2022_23": {
            type: String,
        },
    },
    })

const Msp = mongoose.model("Msp", MspModel);

module.exports = Msp;