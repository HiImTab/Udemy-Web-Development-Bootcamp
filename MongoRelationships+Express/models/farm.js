const mongoose = require('mongoose');
const {Schema} = mongoose; //mongoose.Schema
const Product = require('./product');

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Farm must have a name!']
    },
    city:{
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email required!']
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

//must be before we compile model: const Farm = mongoose.model('Farm', farmSchema);
//we dont have to call next() in a async func
//doesnt have access to farm being deleted since its before deletion
/* farmSchema.pre('findOneAndDelete', async function(data){
    console.log('pre middleware');
    console.log(data);
}) 
//has access to farm being deleted
farmSchema.post('findOneAndDelete', async function(data){
    console.log('post middleware');
    console.log(data);
})*/

//delete all products associated with farm that was deleted
farmSchema.post('findOneAndDelete', async function(farm){
    //console.log('post middleware');
    if(farm.products.length){
        //delete all products where their id is in farm.products array (the farm we just deleted)
        const res = await Product.deleteMany({_id: { $in: farm.products}});
        console.log(res);
    }
})

const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;
