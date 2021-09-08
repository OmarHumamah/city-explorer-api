const { default: axios } = require("axios");
require("dotenv").config();

function gitMovies (req, res){
    let search = req.query.search;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.KEYMOVIE}&query=${search}`;
  
    axios.get(url).then((result) => {
      let newMovies = [];
      result.data.results.forEach((info) => {
        newMovies.push(new movieCons(info));
      });
      res.send(newMovies);
    });
  }
  
  let movieCons = require('./movies_constructor')

  module.exports = gitMovies