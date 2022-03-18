// module imports
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const crypto = require('crypto');

// import routers/endpoint handler middlewares
const userController = require(path.resolve(__dirname, './controllers/userController'));
// const cookieController = require(path.resolve(__dirname, './controllers/cookieController'));
// const sessionController = require(path.resolve(__dirname, './controllers/sessionController'));
// const questboardController = require(path.resolve(__dirname, './controllers/questboardController'));

// helper function(s)
const wait = async function(milisecs) {
  await new Promise(r => setTimeout(r, milisecs));
  return;
};

// initializations and variable declarations
const { BADFAMILY } = require('dns');
const PORT = process.env.PORT || 3000;
const app = express();
const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/questboard-test' : 'mongodb://localhost/questboard-dev';
mongoose.connect(mongoURI);

// express app universal handler configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
app.use( express.static(path.join(__dirname, '../build')) );

// cookie setter middleware definition TODO: modularize into own file later
const cookieSetter = function (req, res, next) {
  // check if client sent a cookie
  // console.log(req);
  let cookie = req.cookies['board_user'];
  res.locals.cookieSet = false;
  if (!cookie) { //  === undefined
    console.log('setting a cookie');
    // no cookie: set a new cookie
    crypto.randomBytes(24, function(err, buffer) {
      let token = buffer.toString('hex');
      res.locals.cookieSet = true;
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.cookie('board_user', token, {maxAge: 300000, httpOnly: true, secure: true });
      res.append('Set-Cookie', 'board_user=' + token + ';');
      res.status(200);
      res.send(token);
    });
    // let randomNumber = Math.random().toString();
    // randomNumber = randomNumber.substring(2,randomNumber.length);
    // res.cookie('cookieName', randomNumber, { maxAge: 300000, httpOnly: true }); // <- five minutes
    console.log('cookie created successfully');
  } else {
    // if cookie was already present 
    res.status(200).json({cookieExists: true});
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
}
// cookie checker middleware function defition TODO: modularize into own file later
const cookieChecker = function (req, res, next) {
  console.log('checking for cookies');
  // check if client sent a cookie
  let cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no cookie: needs to log in
    // do nothing
    console.log('no cookie detected');
  } else {
    // if cookie was already present 
    // check if cookie is stale?
    // append something to the response body that will tell the front end to display the main app (if x setstate display = true)
    // (in lieu of redirecting programmatically)
    res.locals.cookieStatus = true;
  } 
  next();
}

// let static middleware do its job
app.use(express.static(__dirname + '/public'));

// route handlers
// root/default page = login
app.get('/', cookieChecker, (req, res) => { // <- insert middleware to check login status 
  // check if the user is logged in or not thru cookie check middleware
  // if user is logged in, redirect to the board page
  // res.redirect('/questboard');
  console.log('request to origin received');
  if (res.locals.cookieStatus) res.sendFile(path.resolve(__dirname, '../build/questboard.html'));
  // if user is not logged in, redirect to the login page
  else res.sendFile(path.resolve(__dirname, '../build/index.html'));
});
app.options('/login', (req, res) => {
  res.header(
    {
      'Access-Control-Allow-Origin':  'http://localhost:8080',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  ).send();
});
app.post('/login', userController.verifyUser, cookieSetter, (req, res) => { // 
  // if (!res.locals.cookieSet) res.status(200).json({cookieExists: true});
  console.log('login process complete');
  // const respObj = JSON.parse(JSON.stringify(req.body));
  // respObj['cookie'] = true;
  // console.log('response object: ', respObj); // locals.token = 
  // res.status(200).json(req.body);
})
app.post('/', userController.verifyUser, (req, res) => {
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
  res.sendFile(path.resolve(__dirname, '../build/signupsuccess.html'));
  // a set time out invocation to automatically redirect to login (index)
  // setTimeout(() => res.status(301).redirect('/'), 3000);
});
app.get('/signup', userController.getAllUsers, (req, res) => {
  // render signup page
  // res.sendFile(path.resolve(__dirname, '../build/signup.html'));
  res.json(res.locals.allUsers);
});
app.post('/signup', userController.createUser, (req, res) => {
  // save new user thru middleware (async mongodb.save(res.locals.newUser);)
  // after successful middleware invocation, redirect user to success page
  res.status(200).json(res.locals.newUser);
  // res.status(301).redirect('/signup/success');
});
// questboard page
// serve webpacked redux app page from build directory
app.get('/questboard', (req, res) => { // <- insert middleware to populate quests
  // check the login cookie, then render the quest board
  // if user is not logged in, redirect user to sign-in page
  // res.redirect('/login');
  // if logged in, middleware to fetch quests from mongo backend
  /**
  * The previous middleware has populated `res.locals` with quests
  * which we will pass this in to the response body so frontend can generate
  * the proper redux rendering
  */
  return res.json(res.locals.quests); // something like this
});

// handling unrouted endpoint requests with 404
app.get('*', (req, res) => {
  return res.status(404).send();
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
