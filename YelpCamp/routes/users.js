const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

//router.get('/register', users.renderRegister);
//router.post('/register', catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    //passport.authenticate('local') is middleware that will run before the callback
    //it will check if the username and password are correct
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login)

router.get('/logout', users.logout)

module.exports = router;