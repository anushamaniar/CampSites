const Campground = require('../models/campground');
const Review = require('../models/review');

// Controller for handling POST request to create a new review for a campground
module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id); // Find the campground by ID from the request parameters
    const review = new Review(req.body.review); // Create a new Review instance from the request body
    review.author = req.user._id; // Set the author of the review to the current logged-in user's ID
    campground.reviews.push(review); // Add the newly created review to the campground's reviews array
    await review.save();
    await campground.save(); 
    req.flash('success', 'Successfully created a new review!');
    res.redirect(`/campgrounds/${campground._id}`); 
}

// Controller for handling DELETE request to remove a review from a campground
module.exports.deleteReview = async (req, res) => {
    const {id, reviewId} = req.params; // Extract the campground ID and review ID from the request parameters
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}); // Remove the review from the campground's reviews array
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a review!'); 
    res.redirect(`/campgrounds/${id}`);e
}
