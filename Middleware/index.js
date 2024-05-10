const express = require('express')
const morgan = require('morgan')
const app = express()

//app.use() allows us to run code on every single request
/* app.use(()=>{
    console.log('hey now your an all star!!');
}) */

//morgan('tiny') logs information about the request
app.use(morgan('dev'));

app.use((req, res, next) => {
    //req.method = GET;
    req.requestTime = Date.now();
    console.log(req.method, req.path)
    next()
})

//runs code for every request to /dog whether it GET, POST, PUT, PATCH, DELETE, etc
app.use('/dog', (req,res,next)=>{
    console.log('I LOVE DOGGOOSSS!!')
    next();
})

const verifyPassword = (req,res,next)=>{
    const {password} = req.query;
    if(password === 'chickennugget'){
        next();
    }
    res.send('Sorry wrong password:(');
    //req.query -> '?password=chickennugget'
}

//app.use((req, res, next)=>{
    //console.log('this is my first middleware!!');
    //need next() in order to go to next middleware
    //return next();
    //usually you don't want code after next() so do return next() just to be safe
    /* console.log('lalala dark side') */
//})

/* app.use((req, res, next)=>{
    console.log('this is my second middleware!!');
    return next();
}) */

app.get('/', (req,res)=>{
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('home page!')
})

app.get('/dog', (req,res)=>{
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('woof woof!')
})

//verifyPassword is a middleware, as long as it calls next() it will continue to the res.send('Kolton..')
app.get('/secret', verifyPassword, (req,res)=>{
    res.send('Kolton is a furry');
})

//order matters here, (end of app definition)
//if it doesn't find good route (nothing matched), it will run this
app.use((req, res)=>{
    res.status(404).res.send('Not Found...');
})

app.listen(3000, ()=>{
    console.log('listening on port 3000!')
})