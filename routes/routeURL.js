const express = require('express');
const router = express.Router();
const path = require('path');
const validUrl = require('valid-url');
const urlString = require('../utils/urlcreator');
const md5 = require('md5');

const URL = require('../models/url');

//fetch IP Address of the user
const getIP = (req) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip += req.headers['user-agent'];
    ip += Date.now();
    ip += Math.random();
    return md5(ip);
}

let userIpDate = null;

//const baseURLLocalHost = 'http://localhost:3000/';
const baseURLLocalHost = 'https://stlink.herokuapp.com/';
router.post('/link', async (req, res) => {
    // console.log(req.body.url);
    if(req.cookies.userId === undefined){
        // console.log('userId is undefined');
        userIpDate = getIP(req);
        res.cookie('userId', userIpDate, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    }else{
        // console.log('userId is defined');
        userIpDate = req.cookies.userId;
    }

    const getUserUrls = await URL.find({userId: userIpDate});
    if(getUserUrls.length < 50){
        const {
            longUrl
        } = req.body;
        let lurl = longUrl.trim();
        if(lurl == ''){
            res.redirect('/');
        }
        if (!validUrl.isUri(baseURLLocalHost)) {
            return res.status(401).json('Invalid base URL');
        }
        const urlCode = urlString();
        if(validUrl.isUri(longUrl)){
            try {
                const url = await URL.findOne({longUrl});
                if (url && url.userId === userIpDate) {
                    url.clicks++;
                    await url.save();
            //Link already present
                    res.render('present', {
                        url:url
                    });
                }else if(url && url.userId !== userIpDate ){
                    //Link already present but not by the same user
                    url.clicks++;
                    await url.save();
                    res.render('presentwithoutuser', {url: url});
                } else {
            // Create new shorted URL
                    const shortUrl = baseURLLocalHost + urlCode;
                    const newUrl = new URL({
                        longUrl,
                        shortUrl,
                        urlCode,
                        userId: userIpDate,
                    });
                    const url = await newUrl.save();
                    console.log(urlCode);
                    console.log(url.longUrl);
                    res.render('index', {
                        link: url.shortUrl,
                        url: url.longUrl,
                        userId: url.userId,
                    });
                }
            } catch (err) {
                res.json(err);
            }
        }  else {
            res.status(401).sendFile(path.join(__dirname, '..' , 'views', '401.html'));
        }
    }else{
        res.sendFile(path.join(__dirname, '../views', 'limit.html'));
    }

});

router.get('/mylinks',async (req, res) => {
    userUniqueIp = req.cookies.userId;
    console.log(userUniqueIp);
    try{
        const userFind = await URL.find({userId : userUniqueIp});
        res.render('mylinks', {
            userLink: userFind
        });
    }catch(err){
        console.log(err);
    }
});

// Delete a link
router.get('/api/delete/:id', async (req, res) => {
    try {
        const url = await URL.findByIdAndDelete(req.params.id);
        // wait for the link to be deleted
        res.redirect('/mylinks?delete=success');
        // res.json(url);
    } catch (err) {
        res.json(err);
    }
});

// Update a link
router.post('/api/update/:id', async (req, res) => {
    try {
        const url = await URL.findByIdAndUpdate(req.params.id, req.body);
        alert('Link updated successfully');
        res.redirect('/mylinks?update=success');
    } catch (err) {
        res.json(err);
    }
});

router.get('/intro', (req, res)=>{
    res.sendFile(path.join(__dirname, '..' , 'views', 'video.html'));
});




module.exports = router;
