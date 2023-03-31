const asyncHandler = require("express-async-handler");
const axios = require("axios");

const getMSPs = asyncHandler(async (req, res) => {
    const data = await axios.get(`https://api.data.gov.in/resource/14389871-c2f4-4348-b4ca-b55391d4ea0b?api-key=${process.env.DATA_API_KEY}&format=json&limit=20`)
    let records = data.data.records;
    
    records = records.map( record => {
        return {
            id: record?.[`_sl__no_`],
            crop: record?.[`commodity`],
            year: {
                "2019_20": record?.[`minimum_support_prices__rs__per_quintal____2019_20`],
                "2020_21": record?.[`minimum_support_prices__rs__per_quintal____2020_21`],
                "2021_22": record?.[`minimum_support_prices__rs__per_quintal____2021_22`],
                "2022_23": record?.[`minimum_support_prices__rs__per_quintal____2022_23`],
            },

            increase: {
                "2020_21": record?.[`_absolute_increase_over_previous_year___2020_21`],
                "2021_22": record?.[`_absolute_increase_over_previous_year___2021_22`],
                "2022_23": record?.[`_absolute_increase_over_previous_year___2022_23`],
            },
            date: new Date().toISOString(),
        }
    });

    res.status(200).json(records);
})

module.exports = { getMSPs };
