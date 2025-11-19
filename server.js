
// ---------- ---------- ---------- ---------- ---------- //
// ~ IMPORT DEPENDENCIES ~ //
// ---------- ---------- ---------- ---------- ---------- //
require('dotenv').config(); 
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const hikeController = require('./controllers/hike');


// ---------- ---------- ---------- ---------- ---------- //
// ~ EXPRESS APP CONFIGURATION ~ //
// ---------- ---------- ---------- ---------- ---------- //
const app = express();


// ---------- ---------- ---------- ---------- ---------- //
// ~ MIDDLEWARE ~ //
// ---------- ---------- ---------- ---------- ---------- //
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/hikes', hikeController);


// ---------- ---------- ---------- ---------- ---------- //
// ~ INITIAL ROUTE ~ //
// ---------- ---------- ---------- ---------- ---------- //
app.get('/', (req, res) => {
    res.send('Welcome to the Hiking App!')
});


// ---------- ---------- ---------- ---------- ---------- //
// ~ SERVER LISTENER ~ //
// ---------- ---------- ---------- ---------- ---------- //
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));