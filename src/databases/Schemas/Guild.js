const { Schema, model } = require('mongoose')

const guildSchema = new Schema({
  Guild: String,
  Name: String
})
module.exports = model('guild', guildSchema)
