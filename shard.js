const config = require("./config.json");
const {ShardingManager} = require('discord.js');
var numWorkers = require('os').cpus().length;
const cor = require("colors");

const manager = new ShardingManager('./index.js', { 
    totalShards: numWorkers, //numWorkers, //'auto',
    token: config.token, 
    respawn: true
});

manager.on('shardCreate', shard => {
    console.log(cor.rainbow(`[INFO] - [SHARD] Iniciando shard ${shard.id}`))
});
manager.spawn();