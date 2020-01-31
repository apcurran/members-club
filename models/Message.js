const mongoose = require("mongoose");
const moment = require("moment");

const MessageSchema = new mongoose.Schema({
    name: { type: String, required: true, min: 1, max: 100 },
    message: { type: String, required: true, min: 1, max: 10000 },
    date: { type: Date, default: Date.now }
});

MessageSchema
    .virtual("dateFormatted")
    .get(function() {
        return moment(this.date).format("MMMM Do, YYYY");
    });

module.exports = mongoose.model("Message", MessageSchema);