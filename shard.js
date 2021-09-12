const { ShardingManager } = require('discord.js')
const config = require('./src/config/config.json')

const manager = new ShardingManager('./index.js', { token: config.token })

manager.on('shardCreate', shard => console.log(`[SHARDS] - INICIANDO A SHARD ${shard.id}`))

manager.spawn()
