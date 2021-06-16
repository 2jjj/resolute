const { ShardingManager } = require('discord.js');
var numWorkers = require('os').cpus().length;
const config = require("./config.json")

const manager = new ShardingManager('./index.js', {
    totalShards: 'auto', 
    token: 'NzY0OTE5OTQxNTM4Nzc1MDUw.X4NRNQ.8jOaWGn4Ai1Ql5y1HRsPNTb80Dw'
});


manager.spawn();

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));
