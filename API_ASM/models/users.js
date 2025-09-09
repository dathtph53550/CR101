const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Users = new Scheme({
    email: { type: String, unique: true },
    password: { type: String, maxLeght: 255 },
    name: { type: String },
    available: { type: Boolean, default: false },
}, {
    timestamps: true
});

module.exports = mongoose.model('user', Users)