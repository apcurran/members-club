const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkNotAuthenticated } = require("../config/checkAuth");

router.get("/", checkNotAuthenticated, (req, res) => {
    res.render("login", { title: "Login to Member's Club", user: req.user });
});

router.post(
    "/",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })
);

module.exports = router;