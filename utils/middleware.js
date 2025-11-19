
// ---------- ---------- ---------- ---------- ---------- //
// ~ IMPORT DEPENDENCIES ~ //
// ---------- ---------- ---------- ---------- ---------- //
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const hikeController = require('../controllers/hike');
const userController = require('../controllers/user');
const homeController = require('../controllers/home');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// ---------- ---------- ---------- ---------- ---------- //
// ~ MIDDLEWARE FUNCTION ~ //
// ---------- ---------- ---------- ---------- ---------- //
function registerGlobalMiddleware(app) {
    app.use(morgan('dev'));
    app.use(methodOverride('_method'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(session({
        secret: process.env.SECRET,
        store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
        saveUninitialized: true,
        resave: false,
    }));
    app.use('/hikes', hikeController);
    app.use('/user', userController);
    app.use('/', homeController);
}


// ---------- ---------- ---------- ---------- ---------- //
// ~ EXPORT MIDDLEWARE FUNCTION ~ //
// ---------- ---------- ---------- ---------- ---------- //
module.exports = registerGlobalMiddleware;