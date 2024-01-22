const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Slider = new Schema(
    {
        image: { type: String, require: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Slider', Slider);
