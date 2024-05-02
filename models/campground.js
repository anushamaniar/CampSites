const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

// Define a schema for images
const ImageSchema = new Schema ({
    url: String, 
    filename: String 
});

// Define a virtual property 'thumbnail' for the ImageSchema
ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200'); // Modify the URL to fetch a thumbnail version of the image
});

// Options to include virtuals in JSON output
const opts = {toJSON: {virtuals: true}};

// Define the Campground schema
const CampgroundSchema = new Schema({
    title: String, 
    images: [ImageSchema],
    geometry: {
        type: {
            type: String, 
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], 
            required: true
        }
    },
    price: Number, 
    description: String, 
    location: String, 
    author: {
        type: Schema.Types.ObjectId, // Reference to a user
        ref: 'User' // Reference to the User model
    },
    reviews: [
        {
            type: Schema.Types.ObjectId, // Reference to reviews
            ref: 'Review' // Reference to the Review model
        }
    ],
}, opts);

// Define a virtual property 'properties.popUpMarkup' to generate HTML content for map popups
CampgroundSchema.virtual('properties.popUpMarkup').get(function() {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0,30)}...</p>`; // Shortened description with a link to the detailed view
});

// Middleware to handle cleanup of reviews when a campground is deleted
CampgroundSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await review.deleteMany({ // Delete all reviews associated with the campground
            _id: {
                $in: doc.reviews
            }
        });
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema);
