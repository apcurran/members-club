const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("about", { title: "About Member's Club" });
});

module.exports = router;