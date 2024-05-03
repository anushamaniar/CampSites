# CampSite Manager
A CampSite Website that allows users to easily browse, review, and add campsites. Integrated MapBox API for a geo-location of the camps. With a responsive design and integrated authentication system, it offers a seamless experience for campers.

![Screenshot 2024-05-01 221706](https://github.com/anushamaniar/CampSites/assets/128983804/4a2842d0-e67b-473f-9873-3b8efa287ea1)

# Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)

# Project Overview
The project is a CampSite Managing platform built using MongoDB, Express.js, and Node.js. It incorporates two major features: geolocation of the campsite using MapBox API and authentication and authorization of users using 'passport'. These features are accompanied by common functionalities found in CampSite Managing applications, such as registration, camp creation, rating and reviewing various campsites, and other CRUD funcationalites

# Features
- [x] User authentication and authorization
- [x] GeoLocating Camps
- [x] Star Rating and Reviewing for CampSites
- [x] Login/Registration Page
- [x] Creating/Updating/Deleting CampSites  


# Technologies
- MongoDB
- Mongoose
- Express.js
- Node.js
- Passport.js
- HTML5
- CSS
- EJS
- BootStrap

# Getting Started
1. Install [mongodb](https://www.mongodb.com/)
2. Create a cloudinary account to get an API key and secret code
```
git clone https://github.com/anushamaniar/CampSites.git
cd CampSites
npm install
```
3. Create a .env file in the root of the project and add the following:
```
DATABASEURL='<url>'
API_KEY='<key>'
API_SECRET='<secret>'
```
4. Run mongod in a terminal and node app.js in another terminal.
5. Then go to [localhost:3000](http://localhost:3000/).





