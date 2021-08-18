const Discord = require('discord.js');
const config = require('./src/config/config.json');

const manager = new Discord.ShardingManager('./index.js', {
  token: config.token,
  totalShards: config.shards
});

manager.on('shardCreate', shard => console.log(`Launching Shard ${shard.id + 1}`));
manager.spawn();