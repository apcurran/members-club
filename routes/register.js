const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { validationResult } = require('express-validator'); // Validate data
const { body } = require('express-validator'); // Sanitize data
const bcrypt = require("bcrypt");


router.get("/", (req, res) => {
    res.render("register", { title: "Create an Account" });
});

router.post("/", [

    body("email")
        .isEmail()
        .normalizeEmail(),
    body("password")
        .not().isEmpty()
        .isLength({ min: 6, max: 1000 })
        .trim()
        .escape()
        
], async (req, res, next) => { 
    try {
        const errors = validationResult(req);
        // If email or password error exists, re-render page with error message
        if (!errors.isEmpty()) {
            return res.render("register", { title: "Create an Account", email: req.body.email, errors: errors.array() });
        }

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