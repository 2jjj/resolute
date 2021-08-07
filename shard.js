const { ShardingManager } = require('discord.js');
var numWorkers = require('os').cpus().length;
const config = require("./config/config.json")

const manager = new ShardingManager('./index.js', {
    totalShards: config.shards, 
    token: config.token,
    respawn: true,
});


manager.spawn();

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));