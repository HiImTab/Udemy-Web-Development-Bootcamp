//use this file anytime we want to seed our database
//use any time we want to make changes to our model or to our data
const mongoose = require('mongoose');
//added another . (so it can go back an extra folder)
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
 
mongoose.connect('mongodb://localhost:27017/yelp-camp');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/yelp-camp');
  console.log('mongo connection opened!!!')
}

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async()=>{
    //delete all camgrounds
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '64112830dd4e9fb8ac97820e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea aliquid odio nesciunt repellat fugiat rerum doloribus officia mollitia quod! Recusandae reiciendis maxime vel distinctio ab optio beatae? Voluptate, iusto consequatur!',
            price,
            geometry: {
                type: "Point",
                coordinates: [  
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]},
            images: [
                {
                  url: 'https://res.cloudinary.com/dgevlakoe/image/upload/v1683683659/YelpCamp/xbzpwoflgatazpafnmxd.jpg',
                  filename: 'YelpCamp/xbzpwoflgatazpafnmxd',
                },
                {
                  url: 'https://res.cloudinary.com/dgevlakoe/image/upload/v1683683661/YelpCamp/t6gkvw5frsg6vujmu5eq.png',
                  filename: 'YelpCamp/t6gkvw5frsg6vujmu5eq',
                }
            ],
        })
        await camp.save();
    }
}

//seeDB returns a promise since async func
// .then() means if this is resolved
seedDB().then(()=>{
    mongoose.connection.close();
})