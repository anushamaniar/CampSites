const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken:mapboxToken});

const {cloudinary} = require("../cloudinary");

// Controller for handling GET request to list all campgrounds
module.exports.index = async (req,res) => {

    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
}

// Controller for handling GET request to show the new campground form
module.exports.renderNewForm = (req,res) => {
    res.render('campgrounds/new');
}

// Controller for handling POST request to create a new campground
module.exports.createCampground = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location, // Location to geocode
        limit: 1 // Return only the best result
    }).send();
    
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry; // Set the geometry for the campground
    campground.images = req.files.map(f => ({url: f.path, filename: f.filename})); // Map uploaded files to images
    campground.author = req.user._id; // Set the author of the campground to the current user
    await campground.save();
    console.log(campground);
    req.flash('success', 'Successfully created a new campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}


// Controller for handling GET request to show a single campground
module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews', // Populate the reviews of the campground
        populate: {
            path: 'author' // Populate the author of each review
        }
    }).populate('author'); // Populate the author of the campground
    if (!campground) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground});
}

// Controller for handling GET request to edit campground form
module.exports.renderEditForm = async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    if(!campground) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit',{campground});
}

// Controller for handling PUT request to update a campground
module.exports.updateCampground =  async (req,res) => {
    const {id} = req.params;
    console.log(req.body)
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    const imgs = req.files.map(f=>({url:f.path, filename:f.filename}))
    campground.images.push (...imgs);
    await campground.save();
    if(req.body.deleteImages) {
    for(let filename of req.body.deleteImages) {
        await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}});
    console.log(campground);
    }
    req.flash('success','Successfully updated the campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}

// Controller for handling DELETE request to delete a campground
module.exports.deleteCampground = async (req,res) => {
    await Campground.findByIdAndDelete(req.params.id);
    req.flash('success','Successfully deleted campground!');
    res.redirect(`/campgrounds`)
}
