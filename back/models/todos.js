const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema(
    {
        name: { type: String },
        status: { type: String, default: 'uncompleted' },
        priority: { type: Number, default: 3 },
        createdOn: { type: Date },
        updateAt: { type: Date }
    },
    { 
        versionKey: false
    }
);

module.exports = mongoose.model('Todos', todoSchema);








