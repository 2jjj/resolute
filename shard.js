const { ShardingManager } = require('discord.js');
var numWorkers = require('os').cpus().length;

const manager = new ShardingManager('./index.js', {
    totalShards: 5, 
    token: 'ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.fUm4cDC90dHY-_tQQ4GsXgD2w0o'
});


manager.spawn();

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));
