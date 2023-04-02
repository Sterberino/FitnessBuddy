const mongoose = require('mongoose')

//A wrapper to connect to the mongoose database with the provided URL. Remembering the object fields is a pain in the rear.
const ConnectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
}

module.exports = ConnectDB;