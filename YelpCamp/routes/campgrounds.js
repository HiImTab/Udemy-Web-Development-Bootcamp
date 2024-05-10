const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const catchAsync = require('../helpers/catchAsync');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
//dont need to specify index.js since node automatically looks for index.js
const {storage} = require('../cloudinary');
const upload = multer({storage});

router.route('/')
    .get(catchAsync(campgrounds.index))
    //how we add a middleware(validateCampground) into one of our route handlers, you just add it as an argument
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
    /* .post(upload.array('image'), (req, res) => {
        console.log(req.body, req.files);
        res.send('it worked');
    }) */

//needs to come before /campgrounds/:id (it will treat 'new' as an id)
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))


//router.get('/', catchAsync(campgrounds.index));
//router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;