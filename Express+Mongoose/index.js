//to start in node
//npm init -y
//npm i express ejs mongoose

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/farmStand');
  console.log('mongo connection opened!!!')
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//tell express to use middleware that allows us to be able to use/parse req.body in app.post requests
//otherwise req.body will be undefined
app.use(express.urlencoded({extended: true}))
//allows us to use put request from a form
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res)=> {
    const {category} = req.query;
    if(category){
        const products = await Product.find({category})
        res.render('products/index', {products, category});
    }
    else{
        //find all products
        const products = await Product.find({}); 
        res.render('products/index', {products, category: 'All'});
    }
})

app.get('/products/new', (req, res)=>{
    res.render('products/new', {categories})
})

app.post('/products', async (req,res) => {
    const newProduct = new Product(req.body); //still need to error handle
    /* console.log(req.body); */
    await newProduct.save();
/*     console.log(newProduct); */
    res.redirect(`/products/${newProduct._id}`);
})

app.get('/products/:id', async(req, res) => {
    const{id} = req.params;
    const product = await Product.findById(id);
    console.log(product)
    res.render('products/show', {product})
})

app.get('/products/:id/edit', async (req, res)=>{
    const{id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product, categories})
})

app.put('/products/:id', async(req, res) => {
    const{id} = req.params;
    //look at mongoose docs for findByIdAndUpdate -(id, what to update, options)
    //must use await to get resolved value/actual product info we want for product._id
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async(req, res)=> {
    const{id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, ()=> {
    console.log('listening on port 3000!')
})