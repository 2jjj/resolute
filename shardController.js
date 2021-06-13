//By spray (que ganbiarra KKKKKKKKKKKKKKKKKKKKK)

const client = require("./index");
const { ShardingManager } = require('discord.js');
//var numWorkers = require('os').cpus().length;

var shardsguilds = client.on("message", (message) => {
    var shardidguild = message.guild.shard.id;
})

module.exports = shardsguilds;

//console.log(shardsguilds.shardidguild)