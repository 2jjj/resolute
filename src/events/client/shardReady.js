const client = require("../../../index");

module.exports = async (client, shardid) => {
    client.user.setActivity(`Online | Shard: ${shardid}`, {
        shardID: shardid
    });
}

/*
    client.user.setPresence(`Online | Shard: ${shardid}`, {
        shardID: shardid
    });
*/