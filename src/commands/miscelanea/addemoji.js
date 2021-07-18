const Discord = require('discord.js');

module.exports = {
	name: "addemoji",
	aliases: [],
	cooldown: 1000 * 2,
	description: "Adicione um emoji de outro servidor!",
	category: "outros",
	usage: "<emoji>",
	example: "<:linux:817057043470221362>",
	permissoes: ["MANAGE_EMOJIS", "Gerenciar Emojis"],
    args: true,

	async run(client, message, args) {
		
		if (!args[0]) return;
		if (!message.member.hasPermission(module.exports.permissoes[0])) return;
		if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;

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