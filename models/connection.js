
// ---------- ---------- ---------- ---------- ---------- //
// ~ IMPORT DEPENDENCIES ~ //
// ---------- ---------- ---------- ---------- ---------- //
require('dotenv').config();
const mongoose = require('mongoose');

// ---------- ---------- ---------- ---------- ---------- //
// ~ DATABASE CONNECTION ~ //
// ---------- ---------- ---------- ---------- ---------- //
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);
mongoose.connection
  .on('open', () => console.log('Connected to MongoDB'))
  .on('close', () => console.log('Disconnected from MongoDB'))
  .on('error', (error) => console.log(error));

// ---------- ---------- ---------- ---------- ---------- //
// ~ EXPORT CONNECTION ~ //
// ---------- ---------- ---------- ---------- ---------- //
module.exports = mongoose;