const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//or const {Schema} = mongoose;


db = mongoose.connect;
 
mongoose.connect('mongodb://localhost:27017/relationshipDemo');
main().catch(err => console.log(err));

async function main() {
  await db('mongodb://localhost:27017/relationshipDemo');
  console.log('mongo connection opened!!!')
}

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

/* Product.insertMany([
    {name: 'Goddess Melon', price: 4.99, season: 'Summer'},
    {name: 'Watermelon', price: 10.99, season: 'Summer'},
    {name: 'Asparagus', price: 1.99, season: 'Spring'},
]) */

/* const makeFarm = async()=>{
    const farm = new Farm({name: 'Full Belly Farms', city: 'Guinda, CA'});
    const melon = await Product.findOne({name: 'Watermelon'})
    farm.products.push(melon);
    await farm.save();
    console.log(farm);
}
makeFarm(); */

const addProduct = async()=>{
    const farm = await Farm.findOne({name: 'Full Belly Farms'});
    const watermelon = await Product.findOne({name: 'Asparagus'})
    farm.products.push(watermelon);
    await farm.save();
    console.log(farm);
}

//addProduct();

/* Farm.findOne({name: 'Full Belly Farms'}).then(farm => console.log(farm)); */

Farm.findOne({name: 'Full Belly Farms'})
.populate('products').then(farm => console.log(farm));