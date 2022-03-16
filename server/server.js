// module imports
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// import routers/endpoint handler middlewares
const userController = require(path.resolve(__dirname, './controllers/userController'));
// const cookieController = require(path.resolve(__dirname, './controllers/cookieController'));
// const sessionController = require(path.resolve(__dirname, './controllers/sessionController'));
// const questboardController = require(path.resolve(__dirname, './controllers/questboardController'));

// initializations and variable declarations
const { BADFAMILY } = require('dns');
const PORT = process.env.PORT || 3000;
const app = express();
const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/questboard-test' : 'mongodb://localhost/questboard-dev';
mongoose.connect(mongoURI);

// express app universal handler configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// route handlers
// root/default page
app.get('/', (req, res) => { // <- insert middleware to check login status
  // check if the user is logged in or not thru cookie check middleware
  // if user is logged in, redirect to the board page
  // res.redirect('/questboard');
  // if user is not logged in, redirect to the login page
  res.redirect('/login');
});
// login
app.get('/login', (req, res) => {
  // display the login page
})
app.post('/login', userController.verifyUser, (req, res) => {
  // check if valid log-in request, if so, redirect to questboard
  // something like if (res.locals.loginSuccessful) res.redirect('/questboard');
  res.redirect('/questboard');
  // if incorrect log-in, send a response body which gets handled by the
  // client to display an error message
  // stretch goals: if too many failed login attemps, lock-out requester IP
})
// signup
app.get('/signup/success', (req, res) => {
  // display successful sign-up page, which when loading has 
  // a set time out invocation to automatically redirect to /login
});
app.get('/signup', (req, res) => {
  // render signup page
});
app.post('/signup', userController.createUser, (req, res) => {
  // save new user thru middleware (async mongodb.save(res.locals.newUser);)
  // after successful middleware invocation, redirect user to success page
  res.redirect('/signup/success');
});
// questboard page
// serve webpacked redux app page from build directory
app.use('/questboard', express.static(path.join(__dirname, '../build')) );
app.get('/questboard', (req, res) => { // <- insert middleware to populate quests
  // check the login cookie, then render the quest board
  // if user is not logged in, redirect user to sign-in page
  res.redirect('/login');
  // if logged in, middleware to fetch quests from mongo backend
  /**
  * The previous middleware has populated `res.locals` with quests
  * which we will pass this in to the response body so frontend can generate
  * the proper redux rendering
  */
  res.json(res.locals.quests); // something like this
});

// handling unrouted endpoint requests with 404
app.get('*', (req, res) => {
  res.status(404).send();
})

// global error handling middleware
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }, 
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.set('Content-Type','application/json');
  return res.status(errorObj.status).send(JSON.stringify(errorObj.message));
});

// make app listen to PORT
app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});

// export app
module.exports = app;
