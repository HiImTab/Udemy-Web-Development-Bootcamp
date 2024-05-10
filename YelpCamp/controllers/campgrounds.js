const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapBoxToken});
const {cloudinary} = require('../cloudinary');

module.exports.index = async (req, res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
}

module.exports.renderNewForm = (req, res)=>{
    res.render('campgrounds/new');
}

module.exports.createCampground = async(req,res, next)=>{

    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    //longitude is returned before latitude
    //res.send(geoData.body.features[0].geometry.coordinates);
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    //map creates a new array of images and sets to campground.images
    campground.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    campground.author = req.user._id;
    await campground.save();
    console.log(campground);

    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`campgrounds/${campground._id}`);
}

module.exports.showCampground = async(req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews', populate: {
            path: 'author' //populate author of each review
        }
    }).populate('author'); //populate author of campground
    //console.log(campground);
    if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground});
}

module.exports.renderEditForm = async(req,res)=>{
    const campground = await Campground.findById(req.params.id);
    if(!campground){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    //pass through to campgrounds/edit
    res.render('campgrounds/edit', {campground});
}

module.exports.updateCampground = async(req,res)=>{
    console.log(req.body);
    const{id} = req.params;
    //spread operator
    //spread req.body.campground object into this object
    //basically sends all the data from campground object into new object such as the title and location
    const camp = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    const images = req.files.map(f => ({url: f.path, filename: f.filename}));
    //... is spread operator (takes data from array and pushes into camp.images array)
    camp.images.push(...images);
    await camp.save();

    //if there are images to delete
    if(req.body.deleteImages){
        //delete from cloudinary
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        //delete from mongo
        //use pull operator to pull/remove specific image(s) out of the images array
        await camp.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
        console.log(camp);
    }
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${camp._id}`);
}

module.exports.deleteCampground = async(req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
}