const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "dispositivos",
    aliases: ['devices'],
    cooldown: 1000 * 2, 
    description: "Ver qual dispositivo o usuário está usando!",
    category: "outros",
    usage: "@user",

    async run (client, message, args) {

        const user = message.mentions.users.last() || message.author;
        const devices = user.presence?.clientStatus || {};

        const description = () => {
            if (devices > 1) {
                const entries = Object.entries(devices).map(
                    (value) => value[0]
                );
                return `Dispositivo: ${entries}`;
            } else {
                const entries = Object.entries(devices).map(
                    (value, index) => `${index + 1}) ${value[0]}`)
                .join("\n");
                return `Dispositivo:\n${entries}`;
            }
        };
        const embed = new MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL())
        .setDescription(description());

        message.channel.send(embed);
    },
};