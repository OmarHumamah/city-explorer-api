"use strict";
require("dotenv").config();
let express = require("express");
let cors = require("cors");

let serverWeatherAPI = express();
serverWeatherAPI.use(cors());

let PORT = process.env.PORT;

serverWeatherAPI.get("/", (req, res) => {
  res.send("hello from home");
});

/*the old weather port has removed to './old_weather_port.js' because it is useless*/

//...........WEATHER PORT................
let weatherPort = require('./ports/weather/weather')
serverWeatherAPI.get("/weatherbit", weatherPort);
//............................
//...........MOVIES PORT.................
let moviesPort = require('./ports/movies/movies')
serverWeatherAPI.get("/movies", moviesPort);
//............................
serverWeatherAPI.get("*", (req, res) => {
  res.status(500).send("the page is not found 500");
});

serverWeatherAPI.listen(PORT, () => {
  console.log(`API is running on ${PORT}`);
});
