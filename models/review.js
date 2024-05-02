const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Review schema
const reviewSchema = new Schema({
    body: String, 
    rating: Number, 
    author: {
        type: Schema.Types.ObjectId, // Reference to a user's ObjectId
        ref: 'User' // Defines the reference to the User model, linking reviews to users
    }
});

module.exports = mongoose.model('Review', reviewSchema);
