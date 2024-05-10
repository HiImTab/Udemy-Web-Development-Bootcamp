const express = require('express');
const router = express.Router();

// Path: ExpressRouterCookies\routes\shelters.js
router.get('/', (req, res)=>{
    res.send('All shelters');
})

router.post('/', (req,res)=>{
    res.send('Creating a shelter');
})

router.get('/:id', (req,res)=>{
    res.send('This is one shelter');
})

router.get('/:id/edit', (req,res)=>{
    res.send('editing a shelter');
})

module.exports = router;