const { Schema, model } = require('mongoose')

const data = new Schema({
    prefix: String,
    guild: String
})

module.exports = model('prefix-schemas', data);