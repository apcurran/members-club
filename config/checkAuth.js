const express = require("express");
const passport = require("passport");


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/login");
    }

}

function checkNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        return res.render("login", { title: "Login to Member's Club", user: req.user });
    }

}

module.exports = { checkAuthenticated, checkNotAuthenticated };