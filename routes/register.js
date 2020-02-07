const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { validationResult } = require('express-validator'); // Validate data
const { body } = require('express-validator'); // Sanitize data
const bcrypt = require("bcrypt");

function validate(validations) {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);

        if (errors.isEmpty()) return next();

        return res.render("register", { title: "Create an Account", email: req.body.email, errors: errors.array() });
    }
}

router.get("/", (req, res) => {
    res.render("register", { title: "Create an Account" });
});

router.post("/", validate([

    body("name")
        .notEmpty()
        .trim()
        .escape(),
    body("email")
        .isEmail()
        .normalizeEmail(),
    body("password")
        .notEmpty()
        .isLength({ min: 6, max: 1000 })
        .trim()
        .escape()
        
]), async (req, res, next) => { 
    try {
        // If email already exists, re-render register page with error message
        const emailExist = await User.findOne({ email: req.body.email });

        if (emailExist) {
            return res.render("register", { title: "Create an Account", emailAlreadyExists: "Email already exists" });
        }

        // Hash the password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // Otherwise, save to db
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();
        res.redirect("/");

    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;