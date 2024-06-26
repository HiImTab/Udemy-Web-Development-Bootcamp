const ExpressError = require('./helpers/ExpressError');
const {campgroundSchema, reviewSchema} = require('./schemas.js');
const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    //console.log('REQ.USER...', req.user);
    if(!req.isAuthenticated()){
        //console.log(req.path, req.originalUrl)
        //store url they are requesting
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    //if you're authenticated, move on
    next();
}

module.exports.validateCampground = (req, res, next)=>{
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        //details is an array of objects, map over them, return a new array that we join on a comma into a new string
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

module.exports.isAuthor = async(req, res, next)=>{
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
module.exports.isReviewAuthor = async(req, res, next)=>{
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}