const config = require("../../config/config.json");
const User = require("../../databases/mongoDB/User.js")
const fetch = require('node-fetch');

module.exports = {
  name: "ping",
  aliases: ['pp', 'latencia'],
  cooldown: 1000 * 2,
  description: "Pong! Minha latência!",
  category: "info",
  usage: "",
  example: "",
  permissoes: [],
  args: false,

  async run(client, message, args) {

    const startDB = process.hrtime();
    await User.findOne({ idU: message.author.id }, async (err, user) => {});
    const stopDB = process.hrtime(startDB);
    const pingDB = Math.round((stopDB[0] * 1e9 + stopDB[1]) / 1e6) + "ms";

    let svPing = Date.now() - message.createdTimestamp
    let shardPing = await client.shard.fetchClientValues('ws.ping', 0)

    const startLL = process.hrtime();
    await fetch(`https://lavalink-resolute.herokuapp.com/version`, {
      headers: { Authorization: "spraylavalink" }
    });

    const stopLL = process.hrtime(startLL);
    const lavalinkPing = Math.round(((stopLL[0] * 1e9) + stopLL[1]) / 1e6);

    message.inlineReply('Ping?').then(msg => {

      msg.edit(`🏓 **|** Pong!
:satellite: **|** Shard: ${message.guild.shard.id}/${config.shards}
:zap: **|** Ping: ${client.ws.ping}
:stopwatch: **|** API: ${svPing}
<:memoryram:854135087037153280> **|** Shard: ${shardPing}ms
<:mongodb:873390462235451413> **|** MongoDB: ${pingDB}
<:lavalink:873390462046711878> **|** Lavalink: ${lavalinkPing}ms
    `)

    });
  }
}