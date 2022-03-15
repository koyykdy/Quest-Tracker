const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// const userController = require('./controllers/userController');
// const cookieController = require('./controllers/cookieController');
// const sessionController = require('./controllers/sessionController');

const { BADFAMILY } = require('dns');

const PORT = 3000;

const app = express();

const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/questboard-test' : 'mongodb://localhost/questboard-dev';
mongoose.connect(mongoURI);
