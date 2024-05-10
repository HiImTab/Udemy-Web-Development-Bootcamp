const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('All dogs');
})

router.get('/:id', (req, res)=>{
    res.send('ONE dogs');
})

router.get('/:id/edit', (req, res)=>{
    res.send('editing one dogs');
})

module.exports = router;