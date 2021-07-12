const Discord = require("discord.js")

module.exports = {
	name: "kick",
	aliases: ['expulsar'],
	cooldown: 1000 * 2,
	description: "Expulsar uma pessoa de seu servidor.",
	category: "mod",
	usage: "@user <motivo>",
	example: "@Spray#7725 Quebrou a tos do discord.",

	async run(client, message, args) {

		if (!args[0]) return;

		var list = [
			'https://imgur.com/ZNuAcum.gif',
			'https://imgur.com/xlD7P3N.gif',
			'https://imgur.com/cT6TUwv.gif',
			'https://imgur.com/7l7n5un.gif',
			'https://imgur.com/NYZsPRx.gif',
			'https://imgur.com/gVAiCX6.gif',
			'https://imgur.com/usOD4UR.gif',
			'https://imgur.com/4uDadjQ.gif'
		]

		var rand = list[Math.floor(Math.random() * list.length)]

		const embed = new Discord.MessageEmbed()
			.setTitle("Sem permissão.")
			.setColor("RANDOM")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.addField(`Você não possui a permissão de`, `**KICK_MEMBERS**`)
			.setFooter("Resolute", message.author.displayAvatarURL())
			.setTimestamp();


		if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(embed)
		let target = message.mentions.members.first()

		if (target.id === message.author.id) {
			return message.reply("<:x_:856894534071746600> **|** Você não pode se expulsar!")
		}

		let motivo = args.slice(1).join(' ')

		let embed2 = new Discord.MessageEmbed()
			.setDescription(`**O membro ${target.user} foi expulso do servidor!**`)
			.setColor("RANDOM")
			.addField("Usuário", `ﾠ<:setaaa:860626769089265665> ${target.user}`)
			.addField("Moderador", `ﾠ<:setaaa:860626769089265665> ${message.author}`)
			.addField(`Motivo:`, `ﾠ<:setaaa:860626769089265665> \`${motivo.length !== 0 ? `${motivo}` : `Sem motivos.` }\``)
			.setImage(rand)
		await message.channel.send(embed2)
		await target.kick(motivo)
	}
}