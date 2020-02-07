const express = require("express");
const router = express.Router();
const { checkAuthenticated } = require("../config/checkAuth");
const Message = require("../models/Message");
const { validationResult } = require('express-validator'); // Validate data
const { body } = require('express-validator');

function validate(validations) {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);

        if (errors.isEmpty()) return next();

        return res.render("index", { title: "Member's Only Messages", user: req.user, messages: null, errors: errors.array() });
    }
}

router.get("/", checkAuthenticated, (req, res) => {
    // Find all messages in db
    Message.find((err, data) => {
        if (err) return console.error(err);

        res.render("index", { title: "Member's Only Messages", user: req.user, messages: data });
    });
});

router.post("/", validate([

    body("name")
        .notEmpty()
        .trim()
        .escape(),
    body("message")
        .notEmpty()
        .escape()

]), async (req, res, next) => {
    try {
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