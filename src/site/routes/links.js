const express = require("express");
const config = require("../json/config.json");
const router = express.Router();

router.get("/add", (request, response) => {
    return response.redirect(config.invite);
});

router.get("/discord", (request, response) => {
    return response.redirect(config.discord);
});

module.exports = router;