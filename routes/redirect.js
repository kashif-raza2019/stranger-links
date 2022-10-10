const express = require('express');
const router = express.Router();
const path = require('path');

const URL = require('../models/url');

router.get('/:code', async (req, res) => {
    try {
        const url = await URL.findOne({
            urlCode: req.params.code
        })
        if (url) {
            let urlDate = url.date;
            let currentDate = new Date();
            let diff = currentDate - urlDate;
            let diffDays = Math.floor(diff / (1000 * 3600 * 24));
            console.log(urlDate + ' & ' + currentDate);
            if (diffDays > 30) {
                await url.remove();
                res.sendFile(path.join(__dirname, '../views', 'expired.html'));
            }else{
                url.clicks++;
                url.save();
                console.log(url.longUrl);
                res.redirect(url.longUrl);
            }
        } else {
            console.log('No URL found');
            res.status(401).sendFile(path.join(__dirname, '..', 'views', '401.html'));
        }
    } catch (err) {
        console.log('Error');
        res.status(401).sendFile(path.join(__dirname, '..', 'views', '401.html'));
    }
});

module.exports = router;