//to start in node
//npm init -y
//npm i express ejs mongoose

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Product = require('./models/product');
const Farm = require('./models/farm');

mongoose.connect('mongodb://localhost:27017/farmStandTake2');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/farmStandTake2');
  console.log('mongo connection opened!!!')
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//tell express to use middleware that allows us to be able to use/parse req.body in app.post requests
//otherwise req.body will be undefined
app.use(express.urlencoded({extended: true}))
//allows us to use put request from a form
app.use(methodOverride('_method'));

//FARM ROUTES
app.get('/farms', async(req,res)=>{
    const farms = await Farm.find({});
    res.render('farms/index', {farms});
})

app.get('/farms/new', (req, res)=>{
    res.render('farms/new');
})

app.get('/farms/:id', async(req,res)=>{
    const farm = await Farm.findById(req.params.id).populate('products');
    //console.log(farm);
    res.render('farms/show', {farm});
})

app.post('/farms', async(req,res)=>{
    const farm = new Farm(req.body)
    await farm.save();
    res.redirect('/farms');
})

app.get('/farms/:id/products/new', async(req,res)=>{
    const {id} = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', {categories, farm});
})

app.post('/farms/:id/products', async(req,res)=>{
    const {id} = req.params;
    const farm = await Farm.findById(id);
    const {name, price, category} = req.body;
    const product = await new Product({name, price, category})
    
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${id}`);
})

app.delete('/farms/:id', async(req,res)=>{
    //console.log('deletinggg')
    const farm = await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms');
})

//PRODUCT ROUTES
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
    const product = await Product.findById(id).populate('farm', 'name');
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