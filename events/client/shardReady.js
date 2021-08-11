module.exports = (client, shardid) => {

            const status = [{
                    name: `www.rslt.ml | Shard: ${shardid}`,
                    type: 'PLAYING'
                },
                {
                    name: `Online | Shard: ${shardid}`,
                    type: 'PLAYING'
                },
            ]

            function Presence() {
                const base = status[Math.floor(Math.random() * status.length)]
                client.user.setActivity(base)
            }

            Presence();
            setInterval(() => Presence(), 5000)
        }
    /*client.user.setActivity(`Online | Shard: ${shardid}`, {
      shardID: shardid
    });*/
