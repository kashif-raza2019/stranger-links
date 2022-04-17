const mongoose = require('mongoose');

const DB_URI = "mongodb+srv://strangerlinks2704:WekR5vUishuIlCzw@strangerlinks.rq8by.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
const resp = mongoose.connection.readyState;
module.exports = {
    connection,
    resp
}