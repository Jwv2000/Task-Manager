const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { WEATHER_API_KEY, GOLF_LAT, GOLF_LON } = process.env;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${GOLF_LAT}&lon=${GOLF_LON}&units=imperial&appid=${WEATHER_API_KEY}`);
    res.json(response.data);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;
