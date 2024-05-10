const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json')

//tell app to use ejs (dont need to have home.ejs on line 12)
app.set('view engine', 'ejs');
//allows us to call index.js (and access views dir)from outside of current directory
app.set('views', path.join(__dirname, '/views'));

//to include styles in our response, so need to serve css files (and or js files/imgs/audio/fonts etc)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
/*   res.send("HI!!"); */
    //renders a view and sends the rendered html string to the client 
    res.render('home');
})


app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', {num});
})

app.get('/r/:subreddit', (req, res) => {
    const{subreddit} = req.params;
    const data = redditData[subreddit];
/*     console.log(data); */
    if(data){
        res.render('subreddit', { ...data});
    }
    else{
        res.render('notfound', {subreddit});
    } 
    
})

app.get('/cats', (req, res)=>{
    const cats = [
        'Smokey', 'Simon', 'Didi', 'Stormy', 'Oliver', 'Rip', 'Benji'
    ]
    res.render('cats', {cats});
})


app.listen(3000, ()=>{
    console.log("LISTENING ON PORT 3000!")
})
