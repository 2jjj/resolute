const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Pong! Minha latência!",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, message) => {
        var numWorkers = require('os').cpus().length;
        let shardPing = await client.shard.fetchClientValues('ws.ping', 0)

        interaction.followUp({ content: `🏓 **|** Pong!\n:zap: **|** Ping: ${client.ws.ping}ms\n🌏 **|** Ping da shard: ${shardPing}ms` });
    }
};