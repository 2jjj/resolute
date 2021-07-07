const { ShardingManager } = require('discord.js');
var numWorkers = require('os').cpus().length;
const config = require("./botconfig/config.json")

const manager = new ShardingManager('./index.js', {
    totalShards: config.shards, 
    token: config.token
});


manager.spawn();

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));