const Discord = require('discord.js');

module.exports = {
    name: "addemoji",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Adicione um emoji de outro servidor!",
    category: "outros",
    usage: "<emoji>",

    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_EMOJIS")) return message.channel.send(`Você não tem permissão de \`Gerenciar Emojis\`.`)

        for (const emojis of args) {
            const getEmoji = Discord.Util.parseEmoji(emojis);

            if (getEmoji.id) {
                const emojiExt = getEmoji.animated ? '.gif' : '.png';
                const emojiURL = `https://cdn.discordapp.com/emojis/${getEmoji.id + emojiExt}`;
                message.guild.emojis.create(emojiURL, getEmoji.name).then(emoji => message.channel.send(`<:${emoji.name}:${emoji.id}> **|** ${message.author} Emoji adicionado com sucesso!`))
            }
        }
    }
}