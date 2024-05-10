//to look at cookies in browser, go to dev tools > application > cookies
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('thisismysecret'));

app.get('/greet', (req, res)=>{
    //console.log(req.cookies);
    const {name = 'NoName'} = req.cookies;
    res.send(`Hey there, ${name}!`);
})

app.get('/setname', (req, res)=>{
    res.cookie('name', 'Nala');
    res.cookie('animal', 'doggo');
    res.send('OK, cookie sent:)');
})

//signed cookie cannot be tampered with by the client on browser side(dev tools > application > cookies)
//but unsigned cookies can be tampered with
app.get('/getsignedcookie', (req, res)=>{
    res.cookie('fruit', 'grape', {signed: true});
    res.send('OK, signed cookie sent');
})

app.get('/verifyfruit', (req, res)=>{
    console.log(req.cookies);
    res.send(req.signedCookies);
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})

