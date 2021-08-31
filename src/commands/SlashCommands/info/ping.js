const { Client, CommandInteraction } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "ping",
    description: "Obtenha o meu ping",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const startDB = process.hrtime();
        const stopDB = process.hrtime(startDB);
        const pingDB = Math.round((stopDB[0] * 1e9 + stopDB[1]) / 1e6) + "ms";

        const startLL = process.hrtime();
        await fetch(`https://lavalink-resolute.herokuapp.com/version`, {
            headers: {
                Authorization: "spraylavalink"
            }
        });

        const stopLL = process.hrtime(startLL);
        const lavalinkPing = Math.round(((stopLL[0] * 1e9) + stopLL[1]) / 1e6);

        interaction.followUp({ content: `${client.ws.ping}ms\nLavalink: ${lavalinkPing}ms\nShardID: ${interaction.guild.shard.id}` });
    },
};
