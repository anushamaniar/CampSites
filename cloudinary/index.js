// Require and configure Cloudinary's Node.js SDK
const cloudinary = require('cloudinary').v2;
// Require multer-storage-cloudinary which integrates Cloudinary storage engine into Multer
const {CloudinaryStorage} = require('multer-storage-cloudinary');

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary account cloud name
    api_key: process.env.CLOUDINARY_KEY, // Cloudinary account API key
    api_secret: process.env.CLOUDINARY_SECRET // Cloudinary account API secret
});

// Configure and create a new instance of CloudinaryStorage
const storage = new CloudinaryStorage({
    cloudinary, // Pass the Cloudinary configuration
    params: {
        folder: 'YelpCamp', // Specify the folder name where files should be stored in Cloudinary
        allowedFormats: ['jpeg', 'jpg', 'png'] // Set allowed formats for the uploaded files
    }
});

// Export the configured Cloudinary and storage instances
module.exports = {
    cloudinary,
    storage
};
