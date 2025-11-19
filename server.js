
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
// ~ ROUTES ~ //
// ---------- ---------- ---------- ---------- ---------- //
// ~ SEED ROUTE ~ //
app.get('/hikes/seed', async (req, res) => {
    try {
        const startHikes = [
            {rank: 1, hikeName: 'Mount Rainier', elevation: 14411, hikeComplete: true, img: 'https://www.nps.gov/mora/planyourvisit/images/Mount-Rainier-from-Sunrise_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false', dateComplete: new Date('2022-06-15'), username: 'hiker1'},
            {rank: 2, hikeName: 'Mount St. Helens', elevation: 8363, hikeComplete: false, img: 'https://www.nps.gov/mora/planyourvisit/images/Mount-St-Helens-from-June-Lake_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false', dateComplete: null, username: 'hiker2'},
            {rank: 3, hikeName: 'Mount Adams', elevation: 12281, hikeComplete: true, img: 'https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5360031.jpg', dateComplete: new Date('2021-09-10'), username: 'hiker3'}
        ];
        await Hike.deleteMany({});
        const createdHikes = await Hike.insertMany(startHikes);
        res.status(200).json(createdHikes);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });   
    }
});

// ---------- ---------- ---------- ---------- ---------- //
// ~ INDEX ROUTE ~ //
app.get('/hikes', async (req, res) => {
    try {
        const hikes = await Hike.find({});
        res.render('hikes/index.ejs', { hikes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// ---------- ---------- ---------- ---------- ---------- //
// ~ NEW ROUTE ~ //
app.get('/hikes/new', (req, res) => {
    res.render('hikes/new.ejs');
});


// ---------- ---------- ---------- ---------- ---------- //
// ~ DELETE ROUTE ~ //
app.delete('/hikes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Hike.findByIdAndDelete(id);
        res.redirect('/hikes');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// ---------- ---------- ---------- ---------- ---------- //
// ~ UPDATE ROUTE ~ //
app.put('/hikes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        req.body.hikeComplete = req.body.hikeComplete === 'on' ? true : false;
        const updatedHike = await Hike.findByIdAndUpdate(id, req.body, { new: true });
        res.redirect(`/hikes/${id}`);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// ---------- ---------- ---------- ---------- ---------- //
// ~ CREATE ROUTE ~ //
app.post('/hikes', async (req, res) => {
    try {
        req.body.hikeComplete = req.body.hikeComplete === 'on' ? true : false;
        const newHike = await Hike.create(req.body);
        res.redirect('/hikes');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// ---------- ---------- ---------- ---------- ---------- //
// ~ EDIT ROUTE ~ //
app.get('/hikes/:id/edit', async (req, res) => {
    try {
        const id = req.params.id;
        const hike = await Hike.findById(id);
        res.render('hikes/edit.ejs', { hike });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// ---------- ---------- ---------- ---------- ---------- //
// ~ SHOW ROUTE ~ //
app.get('/hikes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const hike = await Hike.findById(id);
        res.render('hikes/show.ejs', { hike });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// ---------- ---------- ---------- ---------- ---------- //
// ~ SERVER LISTENER ~ //
// ---------- ---------- ---------- ---------- ---------- //
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));