module.exports = async (client, shardid) => {
  const usersEval = await client.shard.broadcastEval(u => u.users.cache.size)
  const guildsEval = await client.shard.broadcastEval(g => g.guilds.cache.size)
  const botUsers = usersEval.reduce((prev, val) => prev + val, 0)
  const botGuilds = guildsEval.reduce((prev, val) => prev + val, 0)

  client.user.setActivity(`Procurar música do youtube está desativado. Use o SoundCloud! | Shard: ${shardid}`, {
    shardID: shardid
  })
}
