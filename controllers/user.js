
// ---------- ---------- ---------- ---------- ---------- //
// ~ IMPORT DEPENDENCIES ~ //
// ---------- ---------- ---------- ---------- ---------- //
const express = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');


// ---------- ---------- ---------- ---------- ---------- //
// ~ CREATE USER ROUTE ~ //
// ---------- ---------- ---------- ---------- ---------- //
const router = express.Router();


// ---------- ---------- ---------- ---------- ---------- //
// ~ REGISTER USER ROUTES ~ //
// ---------- ---------- ---------- ---------- ---------- //
// SIGN UP PAGE
router.get('/signup', (req, res) => {
    res.render('user/signup.ejs');
});


// ---------- ---------- ---------- ---------- ---------- //
// SIGN UP LOGIC
router.post("/signup", async (req, res) => {
    try {
        console.log(req.body)
        req.body.password = await bcryptjs.hash(
            req.body.password,
            await bcryptjs.genSalt(10)
        )
        console.log("Hashed Password:", req.body.password)
        await User.create(req.body)
        res.redirect("/user/login")
    } catch (error) {
        console.log("---", error.message, "---")
        res.status(400).send(error.message)
    }
})

// ---------- ---------- ---------- ---------- ---------- //
// LOGIN PAGE
router.get('/login', (req, res) => {
    res.render('user/login.ejs');
});


// ---------- ---------- ---------- ---------- ---------- //
// LOGIN LOGIC
router.post("/login", async (req, res) => {
    try {
      // get the username and password from req.body
      const { username, password } = req.body;
      // search the database for the user
      const user = await User.findOne({ username }); //username
      // check if the user exists
      if (!user) {
        throw new Error("User Error: User Doesn't Exist");
      }
      // check if the password matches
      const result = await bcryptjs.compare(password, user.password)
      // check the result of the match
      if(!result){
          throw new Error("User Error: Password Doesn't Match")
      }
      // save login info in sessions for future requests
      req.session.username = username
      req.session.loggedIn = true

      res.redirect("/hikes")
    } catch (error) {
      console.log("-----", error.message, "------");
      res.status(400).send("error, read logs for details");
    }
  });


// ---------- ---------- ---------- ---------- ---------- //
// LOGOUT ROUTE
router.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/user/login")
    })
})


// ---------- ---------- ---------- ---------- ---------- //
// ~ EXPORT ROUTER ~ //
// ---------- ---------- ---------- ---------- ---------- //
module.exports = router;