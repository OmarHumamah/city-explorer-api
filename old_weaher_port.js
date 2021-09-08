// let weatherData = require("./data/weather.json");


// serverWeatherAPI.get("/weather", (req, res) => {
//   let lat = req.query.lat;
//   let lon = req.query.lon;
//   let searchQuery = req.query.searchQuery;
//   let result = weatherData.find((i) => {
//     if (i.lat === lat || i.lon === lon || i.city_name === searchQuery) return i;
//   });
//   let forCastResult = [];

//   result.data.forEach((n, i) => {
//     forCastResult.push({
//       date: result.data[i].datetime,
//       description: `the high temp is ${result.data[i].high_temp} and the low temp is ${result.data[i].low_temp}, ${result.data[i].weather.description}`,
//     });
//   });
//   console.log(lat);
//   console.log(lon);
//   console.log(searchQuery);
//   console.log(forCastResult);
//   console.log(result.data[0].weather.description);
//   res.send(forCastResult);
// });