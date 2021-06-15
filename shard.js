const { ShardingManager } = require('discord.js');
var numWorkers = require('os').cpus().length;
const config = require("./config.json")

const manager = new ShardingManager('./index.js', {
    totalShards: 'auto', 
    token: 'ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.uVtruAQrFVWePFjAmS9cgQUHDgM'
});


manager.spawn();

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));
