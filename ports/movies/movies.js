require("dotenv").config();
const { default: axios } = require("axios");

let myMemory = {};


function gitMovies (req, res){
  let search = req.query.search;
  if (myMemory[search] !== undefined ) {
    res.send(myMemory[search])
   }
   else{

     let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.KEYMOVIE}&query=${search}`;
     axios.get(url).then((result) => {
       let newMovies = [];
       result.data.results.forEach((info) => {
         newMovies.push(new movieCons(info));
       });
       myMemory[search] = newMovies
       res.send(newMovies);
     });
   }
   
   let movieCons = require('./movies_constructor')
   }
   

  module.exports = gitMovies