const { ShardingManager } = require('discord.js')
const manager = new ShardingManager('./index.js', { token: "ODM3Nzg1MjA1MDYxOTc2MDk2.YIxmRg.LpzQDDrLrq6NWFwFBArs-t3zs_c" })

manager.on('shardCreate', shard => {
    console.log(`Launched shard ${shard.id}`)
    shard.on('ready', () => {
        console.log('Shard ready')
    })
    shard.on('disconnect', (a, b) => {
        console.log('Shard disconnected')
        console.log(a)
        console.log(b)
    })
    shard.on('reconnecting', (a, b) => {
        console.log('Shard reconnecting')
        console.log(a)
        console.log(b)
    })
    shard.on('death', (a, b) => {
        console.log('Shard died')
        console.log(a)
        console.log(b)
    })
})
manager.spawn()