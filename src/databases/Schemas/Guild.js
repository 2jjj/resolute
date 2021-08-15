const { Schema, model } = require('mongoose');

let guildSchema = new Schema({
    Guild: String,
    Name: String,
})
module.exports = model("guild", guildSchema)