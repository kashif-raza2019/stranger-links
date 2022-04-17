const express = require('express');
const router = express.Router();
const path = require('path');
const validUrl = require('valid-url');
const urlString = require('../utils/urlcreator');

const URL = require('../models/url');

const baseURLLocalHost = 'http://localhost:3000/';

router.post('/link', async (req, res) => {
    // console.log(req.body.url);
    const {
        longUrl
    } = req.body;
    if (!validUrl.isUri(baseURLLocalHost)) {
        return res.status(401).json('Invalid base URL')
    }
    const urlCode = urlString();
    if(validUrl.isUri(longUrl)){
        try {
            const url = await URL.findOne({
                longUrl
            });
            if (url) {
                url.clicks++;
                await url.save();
                res.json(url);
            } else {
                const shortUrl = baseURLLocalHost + urlCode;
                const newUrl = new URL({
                    urlCode,
                    longUrl,
                    shortUrl
                });
                const url = await newUrl.save();
                console.log(urlCode);
                console.log(url.longUrl);
                res.render('index', {
                    link: url.shortUrl,
                });
            }
        } catch (err) {
            res.json(err);
        }
    }  else {
        res.status(401).sendFile(path.join(__dirname, 'views', '401.html'));
    }

});

module.exports = router;
