const express = require('express');
const { linkSync } = require('fs');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

// router.post('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/index.html'));
// })

// let link = 'google.com/';

// router.post('/', (req, res, next) => {
//     // var link = req.body.link;
//     console.log(req.body.url);
//     res.render('index', {
//         link: req.body.url,
//         title: 'Home'  
//     });
// })

module.exports = router;