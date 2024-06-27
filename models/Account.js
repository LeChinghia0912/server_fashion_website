const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Account = new Schema(
    {
        fullName: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true },
        password: { type: String, required: true },
        address: { type: String, require: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Account', Account);
