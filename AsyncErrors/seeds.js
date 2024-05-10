//file that will run on its own anytime (no web app, no server, no express) to get some
//new data in a database
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand2');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/farmStand2');
  console.log('mongo connection opened!!!')
}

/* const p = new Product({
    name: 'Ruby Grapefruit',
    price: 1.99,
    category: 'fruit'
})

p.save().then(p => {
    console.log(p);
})
.catch(e => {
    console.log(e);
}) */

//to see all databases in mongo shell use command: show dbs
//use farmStand
//show collections (returns products)
//db.products.find()

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

Product.insertMany(seedProducts)
.then(res => { 
    console.log(res)
})
.catch(e => {
    console.log(e)
})