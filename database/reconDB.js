const { reconDB } = require('reconlx');

const db = new reconDB ({
    uri: 'mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/db'
})

module.exports = recondb;