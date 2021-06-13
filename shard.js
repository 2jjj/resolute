const { ShardingManager } = require('discord.js');
var numWorkers = require('os').cpus().length;

const manager = new ShardingManager('./index.js', {
    totalShards: numWorkers, 
    token: 'NzY0OTE5OTQxNTM4Nzc1MDUw.X4NRNQ.ACmB_7hwECCMfCrO-2TyX9k_UZY'
});

manager.spawn();

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));
