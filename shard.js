/*
    The following code goes into it's own file, and you run this file
    instead of your main bot file.
*/

// Include discord.js ShardingManger
const { ShardingManager } = require('discord.js');

// Create your ShardingManger instance
const manager = new ShardingManager('./index.js', {
    // for ShardingManager options see:
    // https://discord.js.org/#/docs/main/v11/class/ShardingManager

    // 'auto' handles shard count automatically
    totalShards: 'auto', 

    // your bot token
    token: 'NzY0OTE5OTQxNTM4Nzc1MDUw.X4NRNQ.pkl0V44wfk_FAGTx0QcKZbtmdRU '
});

// Spawn your shards
manager.spawn();

// The shardCreate event is emitted when a shard is created.
// You can use it for something like logging shard launches.
manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));
