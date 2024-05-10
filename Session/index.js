const express = require('express');
const app = express();
const session = require('express-session');

const sessionOptions = {secret: 'badsecret', resave: false, saveUninitialized: false};
app.use(session(sessionOptions));

app.get('/viewcount', (req, res) => {
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count = 1;
    }
    res.send(`You have visited this page ${req.session.count} times`);
});

app.get('/register', (req, res) => {
    const {username = "Anon"} = req.query;
    req.session.username = username;
    res.redirect('/greet');
})

//http://localhost:3000/register?username=doodoo to set username to doodoo
app.get('/greet', (req, res) => {
    const {username} = req.session;
    res.send(`Welcome back, ${username}`);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});