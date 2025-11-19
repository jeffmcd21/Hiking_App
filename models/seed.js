
// ---------- ---------- ---------- ---------- ---------- //
// ~ IMPORT DEPENDENCIES ~ //
// ---------- ---------- ---------- ---------- ---------- //
const mongoose = require('./connection');
const Hike = require('./Hike');


// ---------- ---------- ---------- ---------- ---------- //
// ~ SEED CODE ~ //
// ---------- ---------- ---------- ---------- ---------- //
mongoose.connection.on('open', async () => {
    try {
        const startHikes = [
            {rank: 1, hikeName: 'Mount Rainier', elevation: 14411, hikeComplete: true, img: 'https://www.nps.gov/mora/planyourvisit/images/Mount-Rainier-from-Sunrise_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false', dateComplete: new Date('2022-06-15'), username: 'hiker1'},
            {rank: 2, hikeName: 'Mount St. Helens', elevation: 8363, hikeComplete: false, img: 'https://www.nps.gov/mora/planyourvisit/images/Mount-St-Helens-from-June-Lake_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false', dateComplete: null, username: 'hiker2'},
            {rank: 3, hikeName: 'Mount Adams', elevation: 12281, hikeComplete: true, img: 'https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5360031.jpg', dateComplete: new Date('2021-09-10'), username: 'hiker3'}
        ];
        await Hike.deleteMany({});
        const createdHikes = await Hike.insertMany(startHikes);
        console.log('Seeded Hikes:', createdHikes);
    } catch (error) {
        console.log('Error seeding hikes:', error);
    } finally {
        mongoose.connection.close();
    }
});