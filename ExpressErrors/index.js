const express = require('express')
const morgan = require('morgan')
const app = express()

const AppError = require('./AppError')
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
    /* res.send('Sorry wrong password:('); */

    throw new AppError('Password Required!', 401)
    
    //express error handling (which we threw ourselves)
/*     res.status(401);
    throw new Error('Password Required!')  */

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

app.get('/error', (req, res)=>{
    chicken.fly()
})

app.get('/dog', (req,res)=>{
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('woof woof!')
})

//verifyPassword is a middleware, as long as it calls next() it will continue to the res.send('Kolton..')
app.get('/secret', verifyPassword, (req,res)=>{
    res.send('Kolton is a furry');
})

app.get('/admin', (req, res)=>{
    throw new AppError('You are not an admin!!!', 403);
})

//order matters here, (end of app definition)
//if it doesn't find good route (nothing matched), it will run this
app.use((req, res)=>{
    res.status(404).res.send('Not Found...');
})

//order matters, at end of all app.use()
//if there is any error, the code below (our error middleware) will be thrown 
//app.use((err, req, res, next)=>{
    //console.log('*******************************************')
    //console.log('*******************ERRRORRRRR*******************')
    //console.log('*******************************************')
    /* res.status(500).send("OH BOY, WE GOT AN ERROR!"); no need to uncomment this */
    //console.log(err);
    //next error handling middleware (if exist)
    //next(err);
//})

app.use((err,req,res,next)=>{
    //status and message are from AppError()
    const{status= 500, message = 'Something went wrong'} = err; //status default value of 500
    res.status(status).send(message);
})

app.listen(3000, ()=>{
    console.log('listening on port 3000!')
})