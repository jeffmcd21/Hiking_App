
// ---------- ---------- ---------- ---------- ---------- //
// ~ IMPORT DEPENDENCIES ~ //
// ---------- ---------- ---------- ---------- ---------- //
require('dotenv').config(); 
const express = require('express');
const registerGlobalMiddleware = require('./utils/middleware')

// ---------- ---------- ---------- ---------- ---------- //
// ~ EXPRESS APP CONFIGURATION ~ //
// ---------- ---------- ---------- ---------- ---------- //
const app = express();


// ---------- ---------- ---------- ---------- ---------- //
// ~ REGISTER GLOBAL MIDDLEWARE ~ //
// ---------- ---------- ---------- ---------- ---------- //
registerGlobalMiddleware(app);


// ---------- ---------- ---------- ---------- ---------- //
// ~ INITIAL ROUTE ~ //
// ---------- ---------- ---------- ---------- ---------- //
app.get('/', (req, res) => {
    res.redirect('/user/login');
});


// ---------- ---------- ---------- ---------- ---------- //
// ~ SERVER LISTENER ~ //
// ---------- ---------- ---------- ---------- ---------- //
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));