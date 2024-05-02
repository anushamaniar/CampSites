const User = require('../models/user');

// Controller to render the registration form
module.exports.renderRegister = (req, res) => {
    res.render('users/register'); // Show the registration form
}

// Controller for handling user registration
module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body; // Extract email, username, and password from the request body
        const user = new User({ email, username }); // Create a new user instance with email and username
        const registeredUser = await User.register(user, password); // Register the user with a hashed password
        req.login(registeredUser, err => { // Automatically log in the newly registered user
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp'); 
            res.redirect('/campgrounds'); 
        })
    } catch (e) {
        req.flash('error', e.message); 
        res.redirect('register'); 
    }
}

// Controller to render the login form
module.exports.renderLogin = (req, res) => {
    res.render('users/login'); // Show the login form
}

// Controller for handling user login
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back'); 
    const redirectUrl = res.locals.returnTo || '/campgrounds'; // Redirect the user to the last visited page or campgrounds
    res.redirect(redirectUrl);  
}

// Controller for handling user logout
module.exports.logout = (req, res, next) => {
    req.logout(function (err) { // Log out the user
        if (err) {
            return next(err); // Handle errors during logout
        }
        req.flash('success', 'Goodbye!'); 
        res.redirect('/campgrounds');
    });
}
