module.exports = async (client, shardid) => {
    client.user.setActivity(`/help | Shard: ${shardid}`, {
        shardID: shardid
    });
}