"use strict";
require("dotenv").config;
let express = require("express");
let cors = require("cors");
let weatherData = require("./data/weather.json");
const { default: axios } = require("axios");

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
      date: result.data[i].datetime,
      description: `the high temp is ${result.data[i].high_temp} and the low temp is ${result.data[i].low_temp}, ${result.data[i].weather.description}`,
    });
  });
  console.log(lat);
  console.log(lon);
  console.log(searchQuery);
  console.log(forCastResult);
  console.log(result.data[0].weather.description);
  res.send(forCastResult);
});
//...........................
serverWeatherAPI.get("/weatherbit", (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let query = req.query.city;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.KEY || '32173c091a4645d08c10967920a7d2aa'}&city=${query}&lat=${lat}&lon=${lon}`;

  axios.get(url).then((result) => {
    let newForecast = [];
    result.data.data.forEach((day) => {
      newForecast.push(new Forecast(day));
    });
    res.send(newForecast);
  });
});

function Forecast(day) {
  (this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`),
    (this.date = day.datetime);
}
//............................
serverWeatherAPI.get("/movies", (req, res) => {
  let search = req.query.search;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.KEYMOVIE ||"d392d3ce0f9ceefcfd09b99d97173b24"}&query=${search}`;

  axios.get(url).then((result) => {
    let newMovies = [];
    result.data.results.forEach((info) => {
      newMovies.push(new Movie(info));
    });
    res.send(newMovies);
  });
});

function Movie(info) {
  this.title = info.original_title,
    this.overview = info.overview,
    this.average_votes= info.vote_average,
    this.total_votes= info.vote_count,
    this.image_url= `https://image.tmdb.org/t/p/w500${info.poster_path}`,
    this.popularity= info.popularity,
    this.released_on= info.release_date
}
//............................
serverWeatherAPI.get("*", (req, res) => {
  res.status(500).send("the page is not found 500");
});

serverWeatherAPI.listen(PORT, () => {
  console.log(`API is running on ${PORT}`);
});
