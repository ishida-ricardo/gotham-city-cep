require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const mongoose = require('mongoose');

var mongoDB = process.env.DB_HOST;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)

module.exports = mongoose;