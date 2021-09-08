const { default: axios } = require("axios");
require("dotenv").config();
function gitWeather(req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let query = req.query.city;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.KEY}&city=${query}&lat=${lat}&lon=${lon}`;

  axios.get(url).then((result) => {
    let newForecast = [];
    result.data.data.forEach((day) => {
      newForecast.push(new forecastCons(day));
    });
    res.send(newForecast);
  });
}

let forecastCons = require('./weather_constructor')

module.exports = gitWeather;
