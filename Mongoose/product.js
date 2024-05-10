//git bash/node side
//node
//.load product.js

//powershell/mongoose side
//use shopApp
//db.products.find()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shopApp');
  console.log('connection opened!!!')
}

const productSchema = new mongoose.Schema({
  /*   name: String,
    price: Number */
    name: {
        type: String,
        required: true, //nane must be there when creating a new product
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be postive!!!']
        //min: 0 //price cant be neg
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
})

//model instance methods
//used for individual instances of a model (one product)
//dont use arrow function for this b/c it will change value
//(look at bookmark under WebDev folder at when not to use arrow functions)
/* productSchema.methods.greet = function(){
    console.log('hello, hi, howdy')
} */
/* productSchema.methods.greet = function(){
    console.log('hello, hi, howdy')
    console.log(`- from ${this.name}`)
} */
productSchema.methods.toggleOnSale = function(){
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function(newCat){
    this.categories.push(newCat);
    this.save();
}
//end of model instance methods part

//model static methods
//used for finding things, updating things, creating/deleting things (entire model)
productSchema.statics.fireSale = function(){
    //update all = {}
    return this.updateMany({}, {onSale: true, price: 0})
}

const Product = mongoose.model('Product', productSchema);

/* const bike = new Product({ name: 'Mountain Bike', price: 599, categories: ['Biking', 'Mountain']});

bike.save()
    .then(data => {
        console.log('bike saved');
        console.log(data);
    })
    .catch(err => {
        console.log('error!');
        console.log(err);
    }) */

//new: true shows updated version
//pass in options: {new: true, runValidators: true}
//need runValidators whenever updating or validation will be ignored
//dont need runValidators when creating something
/* Product.findOneAndUpdate({name: 'Mountain Bike'}, {price: 399}, {new: true, runValidators: true})
    .then(data => {
        console.log('bike saved');
        console.log(data);
    })
    .catch(err => {
        console.log('error!');
        console.log(err);
    }) */

//model instance methods
const findProduct = async() => {
    const foundProduct = await Product.findOne({name: 'Mountain Bike'});
    /* foundProduct.greet(); */
    console.log(foundProduct)
    await foundProduct.toggleOnSale()
    console.log(foundProduct)
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct)
}
/* findProduct(); */

//model static methods
Product.fireSale().then(res => console.log(res))