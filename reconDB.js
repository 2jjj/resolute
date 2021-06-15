const client = require('./index');
const { reconDB} = require('reconlx');

const database = new reconDB(client, {
         uri: 'mongodb+srv://spray:spray@cluster0.u1wmc.mongodb.net/db'
});

module.exports = database;