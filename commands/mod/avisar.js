const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
	name: "avisar",
	aliases: ['warn', 'aviso'],
	cooldown: 1000 * 2,
	description: "Avisar uma pessoa com aviso na dm e acrescentar warns no warnlist.",
	category: "mod",
	usage: "@user <motivo>",
	example: "warn @Spray#7725 Ofensa a staff",

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

		if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("<:mod:856894534088523776> **|** Sem permissão! | Permissão necessária: **ADMINISTRADOR**")
		let membro = message.mentions.users.first()

		let motivo = args.slice(1).join(" ");

		let embed1 = new Discord.MessageEmbed()
			.setTitle("Resolute")
			.setColor("RANDOM")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.addField(`Usuário avisado:`, `ﾠ<:setaaa:860626769089265665> ${membro} | \`${membro.id}\``)
			.addField(`Autor:`, `ﾠ<:setaaa:860626769089265665> ${message.author} | \`${message.author.id}\``)
			.addField(`Motivo:`, `ﾠ<:setaaa:860626769089265665> \`${motivo.length !== 0 ? `${motivo}` : `Sem motivos para o banimento.` }\``)
			.setFooter("Resolute - Punições", message.author.displayAvatarURL())
			.setImage(rand)
			.setTimestamp();
			
		let embed = new Discord.MessageEmbed() //${membro.username}
			.setTitle(`Você foi avisado!`)
			.setColor('RANDOM')
			.setFooter(`Staff responsável: ${message.author.username}`, message.author.displayAvatarURL())
			.setImage(rand)
			.setDescription(`<:setaaa:860626769089265665> \`${motivo.length !== 0 ? `${motivo}` : `Sem motivos para o warn.` }\``)

		membro.send(embed)
		message.channel.send(embed1)
		await db.add(`warnsCount_${message.guild.id}-${membro.id}`, 1)
	}
}