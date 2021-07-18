const { MessageEmbed } = require('discord.js');

module.exports = {
	name: "channelinfo",
	aliases: ['canalinfo'],
	cooldown: 1000 * 2,
	description: "Obtenha informações de um canal",
	category: "outros",
	usage: "<canal>",
	example: "#geral",
	permissoes: [],
    args: true,

	async run(client, message, args) {

		if (!args[0]) return;

		let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;

		let channelembed = new MessageEmbed()
			.setTitle(`${channel.name}`)
			.setThumbnail(message.guild.iconURL())
			.addField("**NSFW**", channel.nsfw, true)
			.addField("**ID**", channel.id, true)
			.addField("**Tipo**", channel.type)
			.addField("**Descrição**", `${channel.topic || "Sem descrição"}`)
			.addField("**Canal criado em**", channel.createdAt)
			.setColor("RANDOM")
		message.channel.send(channelembed);
	}
}