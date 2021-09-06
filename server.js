"use strict";
require("dotenv").config;
let express = require("express");
let cors = require("cors");
let weatherData = require("./data/weather.json");

let serverWeatherAPI = express();
serverWeatherAPI.use(cors());

let PORT = process.env.PORT || 3011;

serverWeatherAPI.get("/", (req, res) => {
  res.send("hello from home");
});
//...........................
serverWeatherAPI.get("/weather", (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;
  let result = weatherData.find((i) => {
    if (i.lat === lat || i.lon === lon || i.city_name === searchQuery) return i;
  });
  let forCastResult = [];

  result.data.forEach((n, i) => {
    forCastResult.push({ 
        date : result.data[i].datetime,
        description: `the high temp is ${result.data[i].high_temp} and the low temp is ${result.data[i].low_temp}, ${result.data[i].weather.description}`});
  });
  console.log(lat);
  console.log(lon);
  console.log(searchQuery);
  console.log(forCastResult);
  console.log(result.data[0].weather.description);
  res.send(forCastResult);
});
//...........................
serverWeatherAPI.get("*", (req, res) => {
  res.status(500).send("the page is not found 500");
});

serverWeatherAPI.listen(PORT, () => {
  console.log(`API is running on ${PORT}`);
});
