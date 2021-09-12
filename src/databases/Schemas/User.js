const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  User: String
})

module.exports = model('user', userSchema)
