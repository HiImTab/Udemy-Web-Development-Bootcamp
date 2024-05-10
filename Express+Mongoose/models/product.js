const mongoose = require('mongoose');

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
    }
})

const Product = mongoose.model('Product', productSchema);

//export from this file (can now import this model and use it somewhere else)
module.exports = Product;