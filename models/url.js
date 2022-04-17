const { Timestamp } = require('bson');
const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    urlId: String,
    longUrl: String,
    shortUrl: String,
    date: { type: Date, default: Date.now },
    clicks: { type: Number, default: 0 }    
});

// Creating Model from Schema and Exporting
module.exports = mongoose.model('URL', URLSchema);