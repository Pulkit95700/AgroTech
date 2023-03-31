const asyncHandler = require("express-async-handler");
const axios = require("axios");

const getWeatherData = asyncHandler(async (req, res) => {
  try {
      const {data} = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=23.2584857&lon=77.401989&units=metric&appid="+ process.env.WEATHER_API_KEY)

      res.status(200).json({
        id: data.weather[0].id,
        type: data.weather[0].main,
        description: data.weather[0].description,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      })

  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

module.exports = { getWeatherData };
