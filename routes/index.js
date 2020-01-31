const express = require("express");
const router = express.Router();
const { checkAuthenticated } = require("../config/checkAuth");
const Message = require("../models/Message");
const { validationResult } = require('express-validator'); // Validate data
const { body } = require('express-validator');

router.get("/", checkAuthenticated, (req, res) => {
    // Find all messages in db
    Message.find((err, data) => {
        if (err) return console.error(err);

        res.render("index", { title: "Member's Only Messages", user: req.user, messages: data });
    });
});

router.post("/", [

    body("name")
        .not().isEmpty()
        .trim()
        .escape(),
    body("message")
        .not().isEmpty()
        .escape()

], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        // Re-render page with error message
        if (!errors.isEmpty()) {
            return res.render("index", { title: "Member's Only Messages", errors: errors.array() });
        }

        const message = new Message({
            name: req.body.name,
            message: req.body.message
        });

        await message.save();
        res.redirect("/");

    } catch (err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;