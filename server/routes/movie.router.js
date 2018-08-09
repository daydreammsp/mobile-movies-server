const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const request = require("request");
const nodemailer = require('nodemailer');


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
    console.log(newBody)
    let results = newBody.results.map( (item)=>{
        return {id: item.id,
                title: item.title, 
               voteCount: item.vote_count, 
               voteAverage: item.vote_average,
               posterPath: item.poster_path,
               overview: item.overview,
               releaseDate: item.release_date}
        
    })

      console.log('results', results);
      res.send(results)
    });
        })

        router.post('/api/form', (req, res) => {
          console.log(req.body)
          
              // create reusable transporter object using the default SMTP transport
              let transporter = nodemailer.createTransport({
                  host: 'smtp.gmail.com',
                  port: 587,
                  secure: false, // true for 465, false for other ports
                  auth: {
                      user: 'jskruseportfoliosite', // generated ethereal user
                      pass: 'portfoliosite' // generated ethereal password
                  }
              });
          
              // setup email data with unicode symbols
              let mailOptions = {
                  from: 'jskruseportfoliosite@gmail.com', // sender address
                  to: 'jonathanskruse@gmail.com', // list of receivers
                  subject: req.body.subject, // Subject line
                  html: '<h2>'+req.body.name +'</h2>'+'<h2>'+req.body.email +'</h2>'+'<h2>'+req.body.subject +'</h2>'+'<h2>'+req.body.message +'</h2>' // html body
              };
          
              // send mail with defined transport object
              transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      return console.log(error);
                  }
                  console.log('Message sent: %s', info.messageId);
                  // Preview only available when sending through an Ethereal account
                  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          res.send('OK')
                  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
              });
          
      });
    module.exports = router;