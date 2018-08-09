
const express = require('express');
const cors = require('cors');


const app = express();
const bodyParser = require('body-parser');
// const sessionMiddleware = require('./modules/session-middleware');

// const passport = require('./strategies/user.strategy');

// Route includes
 const movieRouter = require('./routes/movie.router');
//api router
// const squareRouter = require('./routes/square.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
// Passport Session Configuration //
// app.use(sessionMiddleware);

// start up passport sessions
// app.use(passport.initialize());
// app.use(passport.session());

/* Routes */
app.use('/', movieRouter);
// app.use('/api/square', squareRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5002;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
