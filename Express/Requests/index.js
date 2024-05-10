//FULL CRUD implemented
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
//can look at uuid docs
const { v4: uuid } = require('uuid');
/* uuid(); */

//parse request body as form-urlencoded data
app.use(express.urlencoded({extended: true}));
//parse request body as json data
app.use(express.json());

app.use(methodOverride('_method'));

//absolute path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//pretend database
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        id: uuid(),
        username: 'Izzy69',
        comment: 'Im actually a furry XD'
    },
    {
        id: uuid(),
        username: 'NalaIsCool',
        comment: 'This is sooooo coool'
    },
    {
        id: uuid(),
        username: 'SmokeyArtichoke',
        comment: 'I hate christmas:(('
    }
]

app.get('/comments', (req,res)=>{
    res.render('comments/index', {comments})
})

app.get('/comments/new', (req,res)=>{
    res.render('comments/new');
})

app.post('/comments', (req,res)=>{
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid()});
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', (req,res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', {comment});
})

//use postman
app.patch('/comments/:id', (req,res) =>{
    const {id} = req.params;
    const newComment = req.body.comment;
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newComment;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res)=>{
    const {id} = req.params;
    //new array that does not have comment
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/tacos', (req,res) =>{
    res.send("GET /tacos response!");
})

app.post('/tacos', (req,res) =>{
    console.log(req.body)
    const{meat, qty} = req.body;
    res.send(`OK, here are your ${qty} ${meat} tacos!!!`);
})

app.listen(3000, ()=> {
    console.log('listening on port 3000!');
})

//basic CRUD functionality blueprint
///(look at slides)
//HTTP verbs: GET, POST, PATCH, DELETE
//base url: comments
//unique identifier (when appropriate) - id
//implementing a restful API (this is only one way)
//
/*
GET /comments - list all comments
POST /comments - Create a new comment
GET /comments:id - get one comment (using id)
PATCH /comments/id: - update one comment
DELETE /comments/:id - destroy one comment
*/