
// ---------- ---------- ---------- ---------- ---------- //
// ~ IMPORT DEPENDENCIES ~ //
// ---------- ---------- ---------- ---------- ---------- //
const mongoose = require("./connection");

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
// ~ EXPORT MODEL ~ //
// ---------- ---------- ---------- ---------- ---------- //
module.exports = Hike;
