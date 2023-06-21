const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
//const methodOverride = require('method-override');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample =  array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()* 2000);
        const camp = new Campground ({
            author:'6486d82942822172ba3b57e7',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { 
                type: 'Point', 
                coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
                ]
            },
            images:[
                {
                //   url: 'https://res.cloudinary.com/dztmsjlea/image/upload/v1687177250/YelpCamp/c9p2fdtx2lc54k5tq08w.jpg',
                url: 'https://res.cloudinary.com/dztmsjlea/image/upload/v1687282132/YelpCamp/Camp3_ctqxmu.png',
                  filename: 'YelpCamp/c9p2fdtx2lc54k5tq08w'
                },
                {
                  url: 'https://res.cloudinary.com/dztmsjlea/image/upload/v1687177250/YelpCamp/uuajykvc2e3kxudmpwfa.jpg',
                  filename: 'YelpCamp/uuajykvc2e3kxudmpwfa'
                }
              ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aperiam aliquid perspiciatis tempora autem sunt corporis rerum quisquam? Molestias, optio quos voluptatem blanditiis nemo eos amet nam excepturi voluptate. Dolores!',
            price: `${price}`
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
