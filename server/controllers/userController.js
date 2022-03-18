const Users = require('../models/userModel'); // <- Mongoose model

const userController = {
  getAllUsers: (req, res, next) => {
    Users.find({}, (err, users) => {
      // if a database error occurs, call next with the error message passed in
      // for the express global error handler to catch
      if (err) {
        const errObj = {
          log: 'Error in middleware function userController.getAllUsers',
          status: 418,
          message: { err: mongoErr }, 
        };
        return next(errObj);
      }
      // store retrieved users into res.locals and move on to next middleware
      res.locals.allUsers = users;
      return next();
    });
  },

  /**
  * createUser - create and save a new User into the database.
  */
  createUser: (req, res, next) => {
    // req.body -> { username: String, password: String, nickname: String, email: String, tos: Boolean}
    // console.log('received request: ');
    // console.log(req.body);
    const { username, password, nickname, email, tos } = req.body;
    const user = {username: username, password: password, nickname: nickname, email: email, tos: tos};
    // console.log('user object: ');
    // console.log(user);
    Users.create(user, (mongoErr, addedUser) => {
      if (mongoErr) {
        console.log('there was an error reported by mongo db: ');
        console.log(mongoErr);
        const errObj = {
          log: 'Error in middleware function userController.createUser',
          status: 418,
          message: { err: mongoErr }, 
        };
        return next(errObj);
      }
      res.locals.newUser = addedUser;
      return next();
    })
  },

  /**
  * verifyUser - Obtain username and password from the request body, locate
  * the appropriate user in the database, and then authenticate the submitted password
  * against the password stored in the database.
  */
  verifyUser: (req, res, next) => {
    // write code here
    console.log('checking login request...');
    const { username, password } = req.body;
    Users.findOne({ username: username }, (mongoErr, foundUser) => {
      let errSeen = false;
      if (mongoErr || !foundUser) errSeen = true;
      else if (foundUser.password !== password) errSeen = true;
      if (errSeen) {
        // deny log in and alert incorrect login credentials for security purposes (combining user not found and incorrect password)
        // extension: count unsuccessful attempts from IP and block after too many bad requests
        if (mongoErr) console.log(mongoErr);
        const errObj = {
          log: 'unsuccessful log-in attempt',
          status: 418,
          message: { err: 'unsuccessful log-in attempt' }, 
        };
        return next(errObj);
      }
      // username and password found in database and matches, allow request to continue to pass through, 
      // to either a cookie-setting midware or the final midware chain
      console.log('successful log-in');
      return next();
    })
  }
};

module.exports = userController;
