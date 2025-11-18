
// ---------- ---------- ---------- ---------- ---------- //
// ~ IMPORT DEPENDENCIES ~ //
// ---------- ---------- ---------- ---------- ---------- //
require('dotenv').config(); 
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');


// ---------- ---------- ---------- ---------- ---------- //
// ~ DATABASE CONNECTION ~ //
// ---------- ---------- ---------- ---------- ---------- //
const DATABASE_URL = process.env.DATABASE_URL
mongoose.connect(DATABASE_URL)
mongoose.connection
  .on('open', () => console.log('Connected to MongoDB'))
  .on('close', () => console.log('Disconnected from MongoDB'))
  .on('error', (error) => console.log(error));


// ---------- ---------- ---------- ---------- ---------- //
// ~ CREATE APP MODEL ~ //
// ---------- ---------- ---------- ---------- ---------- //
const { Schema, model } = mongoose;

const hikeSchema = new Schema({
    rank: Number,
    hikeName: String,
    elevation: Number,
    hikeComplete: Boolean,
    img: String,
    dateComplete: Date,
    username: String
})

const Hike = model('Hike', hikeSchema);


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