module.exports = async (client, shardid) => {
  client.user.setActivity(`spray no topo | Shard: ${shardid}`, {
    shardID: shardid
  })
}
