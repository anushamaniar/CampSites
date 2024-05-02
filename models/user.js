const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// Define the User schema
const UserSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true 
    }
});

// Apply the passportLocalMongoose plugin to the UserSchema
// This plugin will add a username, hash and salt field to store the username, the hashed password and the salt value
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
