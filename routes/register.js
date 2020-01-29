const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require('express-validator'); // Validate data
const { body, sanitizeBody } = require('express-validator'); // Sanitize data


router.get("/", (req, res) => {
    res.render("register", { title: "Create an Account" });
});

router.post("/", [

    check("email").isEmail(),
    check("password").isLength({ min: 6, max: 1000 })

], async (req, res, next) => { 
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors);
            console.log(req.body.email);
            return res.render("register", { title: "Create an Account", email: req.body.email, errors: errors.array() });
        }

        const user = new User({
            email: req.body.email,
            password: req.body.password
        });
        
        await user.save();
        res.redirect("/");

    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;