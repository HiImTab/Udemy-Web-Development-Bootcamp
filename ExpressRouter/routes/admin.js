const express = require('express');
const router = express.Router();

//middleware
router.use((req, res, next) => {
    if(req.query.isAdmin){
        //add ?isAdmin=true to the url to see the secret page
        next();
    }
    res.send("YOU ARE NOT AN ADMIN!");
});

router.get('/topsecret', (req, res)=>{
    res.send('This is top secret');
})

router.get('/deleteeverything', (req, res)=>{
    res.send('Deleting everything');
})

module.exports = router;