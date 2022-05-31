const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String },
        lastname: { type: String },
        email: { type: String },
        username: { type: String },
        role: { type: Number, default: 0 },
        password: { type: String },
        createdOn: { type: Date },
        updateAt: { type: Date }
    },
    { 
        versionKey: false
    }
);

module.exports = mongoose.model('Users', userSchema);