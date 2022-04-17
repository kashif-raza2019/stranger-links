const express = require('express');
const router = express.Router();

const Url = require('../models/url');

router.get('/:code', async (req, res) => {
    const {
        code
    } = req.params;
    try {
        const url = await Url.findOne({
            urlCode: code
        }); 
        if (url) {
            url.clicks++;
            url.save();
            let lu = url.longUrl;
            res.send(`<h5>Redirecting to: ${lu}</h5><script>window.location.href = "${lu}";</script>`);
            // res.render('redirect', {
            //     link: url.longUrl,
            // });
        } else {
            res.status(401).sendFile(path.join(__dirname, 'views', '401.html'));
        }
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;