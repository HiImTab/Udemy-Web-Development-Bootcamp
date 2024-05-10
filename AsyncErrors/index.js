//to start in node
//npm init -y
//npm i express ejs mongoose

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const AppError = require('./AppError')

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand2');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/farmStand2');
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

app.get('/products', wrapAsync(async(req, res, next)=> {
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
}))

//no error handling required here, express usually can handle this
//async functions or when promises involved is usually when you need to handle errors
app.get('/products/new', (req, res)=>{
    res.render('products/new', {categories})
})

app.post('/products', wrapAsync(async(req,res,next) => {
        const newProduct = new Product(req.body); //still need to error handle
        /* console.log(req.body); */
        await newProduct.save();
        res.redirect(`/products/${newProduct._id}`);
}))

//basically returns the function we called in but adds a .catch() to it so it catches errors 
//^(instead of using try/catch block)
function wrapAsync(fn){
    return function(req, res, next){
        fn(req,res,next).catch(e => next(e));
    }
}

//**FOR ASYNC FUNCTIONS HAVE NEXT IN PARAMETERS IF THROWING ERROR!*/
app.get('/products/:id', wrapAsync(async(req, res, next) => {
  
    const{id} = req.params;
    const product = await Product.findById(id);
    if(!product){
        //if there is no try/catch, make sure to return or it will run res.render()
        throw new AppError('Product not found:/', 404);
    }
    res.render('products/show', {product})
    /* console.log(product) */
}))

//example of a try/catch error handling (***wrapAsync recommended***)
app.get('/products/:id/edit', async(req, res, next)=>{
    try{
        const{id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            throw new AppError('Product not found://', 404);
        }
        res.render('products/edit', {product, categories})
    }
    catch(e){
        next(e);
    }
})

app.put('/products/:id', wrapAsync(async(req, res, next) => {
        const{id} = req.params;
        //look at mongoose docs for findByIdAndUpdate -(id, what to update, options)
        //must use await to get resolved value/actual product info we want for product._id
        const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
        res.redirect(`/products/${product._id}`)
}))

app.delete('/products/:id', wrapAsync(async(req, res)=> {
    const{id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
}))

const handleValidationErr = err => {
    console.log(err);
    return new AppError(`Validation Failed...${err.message}`, 400);
}

//mongoose error logging
//mongoose errors do have a name
app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name === 'ValidationError') err = handleValidationErr(err);
    next(err);
})

app.use((err,req,res,next)=>{
    const{status= 500, message = 'Something went wrong'} = err;
    res.status(status).send(message);
})

app.listen(3000, ()=> {
    console.log('listening on port 3000!')
})