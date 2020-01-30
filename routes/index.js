const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { title: "Members Only", user: req.user });
});

router.get("/log-out", (req, res) => {
    req.logout();
    res.redirect("/");
})

module.exports = router;