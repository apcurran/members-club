const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("register", { title: "Create an Account" });
});

module.exports = router;