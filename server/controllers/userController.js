const User = require('../models/userModel'); // <- Mongoose model

const userController = {
  getAllUsers: (req, res, next) => {
    User.find({}, (err, users) => {
      // if a database error occurs, call next with the error message passed in
      // for the express global error handler to catch
      if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
  
      // store retrieved users into res.locals and move on to next middleware
      res.locals.users = users;
      return next();
    });
  },

  /**
  * createUser - create and save a new User into the database.
  */
  createUser: (req, res, next) => {
    // req.body -> { username: [String], password: [String] }
    if (Object.prototype.hasOwnProperty.call(req.body, 'username') && Object.prototype.hasOwnProperty.call(req.body, 'password')) {
      if (typeof req.body.username === 'string' && typeof req.body.password === 'string') {
        res.locals.newUser = req.body;
        next();
      } else {
        // everything here is an error
        next('ERROR in userController.createUser: request body\'s username or password wasn\'t of type string');
      }
    } else {
      next('ERROR in userController.createUser: request body doesn\'t have username or password');
    }
  },

  /**
  * verifyUser - Obtain username and password from the request body, locate
  * the appropriate user in the database, and then authenticate the submitted password
  * against the password stored in the database.
  */
  verifyUser: (req, res, next) => {
    // write code here
  
  }
};

module.exports = userController;
