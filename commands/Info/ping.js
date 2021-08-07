const Discord = require("discord.js");
const config = require("../../config/config.json");

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

    var numWorkers = require('os').cpus().length;
    let svPing = Date.now() - message.createdTimestamp
    let shardPing = await client.shard.fetchClientValues('ws.ping', 0)

    message.reply('Ping?').then(msg => {  
      msg.edit(`🏓 **|** Pong!\n:satellite: **|** Shard: ${message.guild.shard.id}/${config.shards}\n:stopwatch: **|** Latência da API: ${svPing}ms\n:zap: **|** Ping: ${client.ws.ping}ms\n🌏 **|** Ping da shard: ${shardPing}ms`)
    });
  }
}