module.exports = async (client, shardid) => {
  client.user.setActivity(`Shard: ${shardid}`, {
    shardID: shardid
  })
}
