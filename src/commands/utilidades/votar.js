const Discord = require("discord.js")

module.exports = {
	name: "votar",
	aliases: ['votacao', 'vote'],
	cooldown: 1000 * 2,
	description: "Abra uma votação no seu servidor!",
	category: "util",
	usage: "<conteudo>",
	example: "Devo criar um chat de divulgação?",
	permissoes: [],
	args: true,

	async run(client, message, args) {

		if (!args[0]) return;

		var content = args.join(' ')

		if (content.length > 600) {
			return message.inlineReply('<:1926blurplecross:856520144872407060> **|** O conteúdo a ser votado não pode passar de **600 caracteres.**')
		}

		var embed = new Discord.MessageEmbed()
			.setTitle("Votação")
			.setColor("RANDOM")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.addField(`Conteúdo:`, `ﾠ<:setaaa:860626769089265665> \`${content}\``)
			.addField(`Autor da votação:`, `ﾠ<:setaaa:860626769089265665> ${message.author} | \`${message.author.id}\``)
			.setFooter("Resolute - Votação", message.author.displayAvatarURL())
			.setTimestamp();

		if (content) {
			return message.channel.send(embed).then(msg => {
				msg.react(`<a:sim:845773734862258197>`).catch(err => {
					return
				})
				msg.react(`<a:nao:845773685330804756>`).catch(err => {
					return
				})
			})
		}
	}
}