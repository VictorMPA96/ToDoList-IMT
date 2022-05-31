const mongoose = require('mongoose');

const connectMongoose = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", function(err) {
        if(err) {
            console.log('connection error', err)
        } else {
            console.log('connection successful')
        }
    })
}

exports.connectMongoose = connectMongoose;

