const { Schema, model } = require('mongoose');

let userSchema = new Schema({
    User: String,
})

module.exports = model("user", userSchema)