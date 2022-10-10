const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/user');
const writemail= require('../utils/mail');

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email, password }, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else if (!user) {
            res.status(404).sendFile(path.join(__dirname, '../views/404.html'));
        } else {
             writemail(user.email, 'Login Detected!', 'You have been logged in to the system with Email: '+user.email+' & Password: '+user.password);
            res.status(200).send(user);

        }
    });
});

router.post('/signup', (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({
        email,
        password
    });
    newUser.save((err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            res.status(200).send(user + ' has been saved' + '\n' + "<a href='/login'>Click Here to Login!</a>") ;
        }
    });
})

module.exports = router;