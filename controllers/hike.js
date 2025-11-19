
// ---------- ---------- ---------- ---------- ---------- //
// ~ IMPORT DEPENDENCIES ~ //
// ---------- ---------- ---------- ---------- ---------- //
const express = require('express');
const Hike = require('../models/Hike');

// ---------- ---------- ---------- ---------- ---------- //
// ~ CREATE ROUTER ~ //
// ---------- ---------- ---------- ---------- ---------- //
const router = express.Router();


// ---------- ---------- ---------- ---------- ---------- //
// ~ ROUTER MIDDLEWARE ~ //
// ---------- ---------- ---------- ---------- ---------- //
router.use((req, res, next) => {
    console.table(req.session)
    if(req.session.loggedIn) {
        next();
    } else {
    res.redirect("/user/login")
    }
});


// ---------- ---------- ---------- ---------- ---------- //
// ~ ROUTES ~ //
// ---------- ---------- ---------- ---------- ---------- //
// ~ SEED ROUTE ~ //
// router.get('/seed', async (req, res) => {
//     try {
//         const startHikes = [
//             {rank: 1, hikeName: 'Mount Rainier', elevation: 14411, hikeComplete: true, img: 'https://www.nps.gov/mora/planyourvisit/images/Mount-Rainier-from-Sunrise_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false', dateComplete: new Date('2022-06-15'), username: 'hiker1'},
//             {rank: 2, hikeName: 'Mount St. Helens', elevation: 8363, hikeComplete: false, img: 'https://www.nps.gov/mora/planyourvisit/images/Mount-St-Helens-from-June-Lake_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false', dateComplete: null, username: 'hiker2'},
//             {rank: 3, hikeName: 'Mount Adams', elevation: 12281, hikeComplete: true, img: 'https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5360031.jpg', dateComplete: new Date('2021-09-10'), username: 'hiker3'}
//         ];
//         await Hike.deleteMany({});
//         const createdHikes = await Hike.insertMany(startHikes);
//         res.status(200).json(createdHikes);

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal Server Error' });   
//     }
// });

// ---------- ---------- ---------- ---------- ---------- //
// ~ INDEX ROUTE ~ //
router.get('/', async (req, res) => {
    try {
        const username = req.session.username;
        const hikes = await Hike.find({ username });
        // const hikesComplete = await Hike.find({ hikeComplete: true, username });
        // const hikesIncomplete = await Hike.find({ hikeComplete: false, username });
        res.render('hikes/index.ejs', { hikes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// ---------- ---------- ---------- ---------- ---------- //
// ~ NEW ROUTE ~ //
router.get('/new', (req, res) => {
    res.render('hikes/new.ejs');
});


// ---------- ---------- ---------- ---------- ---------- //
// ~ DELETE ROUTE ~ //
router.delete('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        req.body.hikeComplete = req.body.hikeComplete === 'on' ? true : false;
        req.body.username = req.session.username;
        const updatedHike = await Hike.findByIdAndUpdate(id, req.body, { new: true });
        res.redirect(`/hikes/${id}`);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// ---------- ---------- ---------- ---------- ---------- //
// ~ CREATE ROUTE ~ //
router.post('/', async (req, res) => {
    try {
        req.body.hikeComplete = req.body.hikeComplete === 'on' ? true : false;
        req.body.username = req.session.username;
        const newHike = await Hike.create(req.body);
        res.redirect('/hikes');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// ---------- ---------- ---------- ---------- ---------- //
// ~ EDIT ROUTE ~ //
router.get('/:id/edit', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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
// ~ EXPORT ROUTER ~ //
// ---------- ---------- ---------- ---------- ---------- //
module.exports = router;