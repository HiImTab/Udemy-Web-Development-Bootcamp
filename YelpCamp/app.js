//if we are running in development mode (not production), 
//we want to load our environment variables from our .env file
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
//console.log(process.env.SECRET);

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./helpers/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const helmet = require('helmet');

const mongoSanitize = require('express-mongo-sanitize');

const userRoutes = require('./routes/users');
const campgroundsRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');

const MongoDBStore = require('connect-mongo')(session);

//cloud mongo database
/* const dbUrl = process.env.DB_URL; */
const dbUrl = 'mongodb://localhost:27017/yelp-camp';
db = mongoose.connect;

//to suppress deprecation warnings
mongoose.set("strictQuery", false);


mongoose.connect(dbUrl);
main().catch(err => console.log(err));

async function main() {
  await db(dbUrl);
  console.log('mongo connection opened!!!')
}

const app = express();

//configurations
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middleware
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
//to serve public directory
app.use(express.static(path.join(__dirname, 'public')));
//prevents mongo injection, gets rid of prohibited characters
app.use(mongoSanitize());
app.use(helmet({contentSecurityPolicy: false,}));

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dgevlakoe/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

//use mongo to store session data
const store = new MongoDBStore({
    url: dbUrl,
    secret: 'doodoofeces',
    //lazy session update, once every 24hrs
    touchAfter: 24 * 60 * 60
});

store.on('error', function(e){
    console.log('Session Store Error', e);
})

const sessionConfig = {
    store,
    name: 'session',
    secret: 'doodoofeces',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        //secure: true,
        //1000 ms in a sec, 60 sec in a min, 60 min in an hour, 24 hours in a day, 7 days in a week
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
//this needs to be above passport.session
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
//if we want persistent login sessions
app.use(passport.session());
//tell passport to use local strategy and the authentication method is located on our user model and 
//it's called authenticate(made by passportLocalMongoose)
passport.use(new LocalStrategy(User.authenticate()));

//tell passport how to serialize
//serialize: how do we store user in session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to pass flash messages to all templates
app.use((req, res, next)=>{
    //console.log(req.query);
    //console.log(req.session);
    //if there is a current user, pass it to the template
    res.locals.currentUser = req.user;
    //if there is a success, pass it to the template
    res.locals.success = req.flash('success');
    //if there is an error, pass it to the template
    res.locals.error = req.flash('error');
    next();
})

/*
app.get('/fakeUser', async (req, res)=>{
    const user = new User({email: 'tab@gmail.com', username: 'tab'});
    //register is a method provided by passportLocalMongoose***
    //that register a new user instance with a given password (chicken)
    //also checks if username is unique as well as salt and hash the password
    const newUser = await User.register(user, 'chicken');
    res.send(newUser);
})*/

//route handlers
app.use('/', userRoutes);
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/reviews', reviewsRoutes);

//routes
app.get('/', (req, res)=>{
    res.render('home');
})

//every path/rqst call this (if doesn't match with any requests/path above
app.all('*', (req, res, next)=>{
    next(new ExpressError('Page Not Found', 404))
})

//error handler
app.use((err, req, res, next)=>{
    const {statusCode = '500'} = err;
    //give message default val (extracting it from err (like we did with statusCode) would not update it)
    if(!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('errors', {err})
})

app.listen(3000, () => {
    console.log('Listening on port 3000!')
})