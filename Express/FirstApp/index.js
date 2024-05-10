//npm init -y
const express = require('express');

const app = express()
/* console.dir(app) */

//req = request
//res = response back

/* app.use((req, res)=>{
    console.log('we got a new request!');
     //res.send('Hello we got your request!') 
    //res.send({color: 'red'})  // json
    res.send('<h1>This is my webpage!</h1>') 
}) */
//can't have an http request that gets more than one response so commented out code above^^

app.listen(3000, ()=>{
    console.log('listening on port 3000!')
})

//finding a pattern, not an exact match
//use : to designate something as a path variable
app.get('/r/:subreddit', (req, res)=>{
    /* console.log(req.params); */
    const {subreddit} = req.params;
    res.send(`<h1>THIS IS A ${subreddit} SUBREDDIT!</h1>`);
})

app.get('/r/:subreddit/:postID', (req, res)=>{
    /* console.log(req.params); */
    const {subreddit, postID} = req.params;
    res.send(`<h1>THIS IS A ${subreddit} SUBREDDIT! Post ID: ${postID}</h1>`);
})

//http://localhost:3000/search?q=dog
//http://localhost:3000/search?q=dog&color=green
app.get('/search', (req, res) => {
    const {q, color} = req.query;
    if(!q && !color){
        res.send("NOTHING FOUND IF NOTHING SEARCHED!!!")
    }
    else{
        res.send(`<h1>Search results for: ${q} color: ${color}</h1>`);
    }
})

// /cats => 'meow'
// /dogs => 'woof'
// '/'
//referred to as the root route
app.get('/', (req, res) =>{
    res.send("This is the home page!")
})


app.get('/cats', (req, res) =>{
    console.log('cat request!');
    res.send("MEOW!")
})

//works in postman
app.post('/cats', (req, res) =>{
    res.send("POST REQUESTTTT")
})

app.get('/dogs', (req, res) =>{
    console.log('dog request!');
    res.send("WOOF!")
})


//end of other requests so if its not / /dogs or /cats then this response will send
app.get('*', (req,res)=>{
    res.send(`I don't know that path!`)
})