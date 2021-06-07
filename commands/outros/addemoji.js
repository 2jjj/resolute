const Discord = require('discord.js');

module.exports = {
    name: "addemoji",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Adicione um emoji!",
    category: "outros",
    usage: "<emoji>",

    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_EMOJIS")) return message.channel.send(`Você não tem permissão de \`Gerenciar Emojis\`.`)

        if (!args.length)
            return message.channel.send(`Especifique o emoji.`)

        for (const emojis of args) {
            const getEmoji = Discord.Util.parseEmoji(emojis);

            if (getEmoji.id) {
                const emojiExt = getEmoji.animated ? '.gif' : '.png';
                const emojiURL = `https://cdn.discordapp.com/emojis/${getEmoji.id + emojiExt}`;
                message.guild.emojis.create(emojiURL, getEmoji.name).then(emoji => message.channel.send(`Sucesso, o emoji \`${emoji.name}\` foi adicionado ao servidor.`))
            }
        }
    }
}