const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "botinfo",
    description: "Obtenha as minhas informacoes",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.followUp({ embeds:  });
    },
};
