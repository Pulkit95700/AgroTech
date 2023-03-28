const asyncHandler = require("express-async-handler");
const axios = require("axios");

const getWeatherData = asyncHandler(async (req, res) => {
  const city = req.query.city;
  if (city === undefined || city === null || city === "") {
    res.status(400);
    throw new Error("City is required");
  }
  try {
 

  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

module.exports = { getWeatherData };
