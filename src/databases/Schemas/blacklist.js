const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  id: String
})

module.exports = mongoose.model('blacklist', Schema)
