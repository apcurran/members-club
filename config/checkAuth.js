const express = require("express");
const passport = require("passport");


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return res.redirect("/");

    next();
}

module.exports = { checkAuthenticated, checkNotAuthenticated };