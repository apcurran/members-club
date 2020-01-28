const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("login", { title: "Login to Member's Club" });
});

module.exports = router;