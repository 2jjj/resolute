module.exports = async (client, shardid) => {
    client.user.setActivity(`/ajuda | Shard: ${shardid}`, {
        shardID: shardid
    });
}