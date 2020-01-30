const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    name: { type: String, required: true, min: 1, max: 100 },
    message: { type: String, required: true, min: 1, max: 10000 },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", MessageSchema);