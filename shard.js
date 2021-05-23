const {ShardingManager} = require('discord.js');
var numWorkers = require('os').cpus().length;
const cor = require("colors");

const manager = new ShardingManager('./index.js', { 
    totalShards: 'auto', //numWorkers, //'auto',
    token: "ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.LpzQDDrLrq6NWFwFBArs-t3zs_c", 
    respawn: true
});

manager.on('shardCreate', shard => {
    console.log(cor.red(`[INFO] - [SHARD] Iniciando shard ${shard.id}`))
    console.log(cor.red(`[INFO] - [SHARD] Shard ID ${shard.id}`))
});
manager.spawn();