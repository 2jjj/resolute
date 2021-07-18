const Discord = require("discord.js")

module.exports = {
	name: "kick",
	aliases: ['expulsar'],
	cooldown: 1000 * 2,
	description: "Expulsar uma pessoa de seu servidor.",
	category: "mod",
	usage: "@user <motivo>",
	example: "@Spray#7725 Quebrou a tos do discord.",
	permissoes: ["KICK_MEMBERS", "Expulsar Membros"],
	args: true,

	async run(client, message, args) {

		if (!args[0]) return;
		if (!message.member.hasPermission(module.exports.permissoes[0])) return;
		if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;

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
		let target = message.mentions.members.first()

		let motivo = args.slice(1).join(' ')

		let embed2 = new Discord.MessageEmbed()
			.setDescription(`**O membro ${target} foi expulso do servidor!**`)
			.setColor("RANDOM")
			.addField("Usuário", `ﾠ<:setaaa:860626769089265665> ${target}`)
			.addField("Moderador", `ﾠ<:setaaa:860626769089265665> ${message.author}`)
			.addField(`Motivo:`, `ﾠ<:setaaa:860626769089265665> \`${motivo.length !== 0 ? `${motivo}` : `Sem motivos.` }\``)
			.setImage(rand)
		await message.channel.send(embed2)
		await target.kick(motivo)
	}
}