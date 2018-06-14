const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const request = require("request");

// router.get('/', (req, res) => {
//     console.log('router request')
//     let options = { method: 'GET',
//   url: 'https://api.themoviedb.org/3/search/movie',
//   qs: 
//    { api_key: '82a12a54b5388a78460f43520ffc035e',
//      query: 'action',
//      language: 'en-US',
//      page: '1',
//      include_adult: 'true' },
//   headers: 
//    { 'Cache-Control': 'no-cache',
//      Accept: 'application/json',
//      Authorization: 'Bearer sq0atp--xOe6YM9OchfFi_-1UURRw',
//      'Content-Type': 'application/x-www-form-urlencoded' },
//   form: false };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);
// let newBody = JSON.parse(body)
// let results = newBody.results.map( (item)=>{
//     return item.title
// })
//   console.log('results', results);
//   res.send(results)
// });
    // })
    router.post('/api', (req, res) => {
        let searchMovie = req.body[0]
        console.log('router request api', searchMovie )
        let options = { method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      qs: 
       { api_key: '82a12a54b5388a78460f43520ffc035e',
         query: searchMovie,
         language: 'en-US',
         page: '1',
         include_adult: 'true' },
      headers: 
       { 'Cache-Control': 'no-cache',
         Accept: 'application/json',
         Authorization: 'Bearer sq0atp--xOe6YM9OchfFi_-1UURRw',
         'Content-Type': 'application/x-www-form-urlencoded' },
      form: false };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    let newBody = JSON.parse(body)
    let results = newBody.results.map( (item)=>{
        return item.title
    })
      console.log('results', results);
      res.send(results)
    });
        })

    module.exports = router;