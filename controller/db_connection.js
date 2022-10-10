const mongoose = require('mongoose');

const DB_URI = "";

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
const resp = mongoose.connection.readyState;
module.exports = {
    connection,
    resp
}