const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    placeId: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    fizz:{
        type: Number,
        required: true
    }
})

const Bar = mongoose.model('Bar', barSchema);
module.exports = Bar;