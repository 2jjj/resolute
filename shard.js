const { ShardingManager } = require('discord.js');
var numWorkers = require('os').cpus().length;
const config = require("./src/config/config.json")

const manager = new ShardingManager('./index.js', {
    totalShards: config.shards, 
    token: config.token,
});


manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} iniciada`));

manager.spawn(manager.totalShards, 10000);