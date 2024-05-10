const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowecase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    },
    farm:{ 
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    }
})

const Product = mongoose.model('Product', productSchema);

//export from this file (can now import this model and use it somewhere else)
module.exports = Product;