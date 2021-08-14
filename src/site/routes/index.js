const express = require("express");
const commands = require("../json/commands.json");
const router = express.Router();

router.get("/", (request, response) => {
    return response.render("home");
});

router.get("/commands", (request, response) => {
    return response.render("commands", {
        commands
    });
});

module.exports = router;