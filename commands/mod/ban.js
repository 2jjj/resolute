const Discord = require("discord.js");

module.exports = {
	name: "ban",
	aliases: ['banir'],
	cooldown: 1000 * 2,
	description: "Banir um usuário permanentemente de seu servidor com aviso na dm.	",
	category: "mod",
	usage: "@usuario <motivo>",
	example: "@Spray#7725 Ofensa a staff",
	permissoes: "BAN_MEMBERS",
	
	async run(client, message, args) {

		if(!args[0]) return;
		if (!message.member.hasPermission(module.exports.permissoes)) return;

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

		const usuario = message.mentions.members.first()
		const motivo = args.slice(1).join(" ");

		if (!usuario.bannable) return message.channel.send({
			embed: {
				color: "RANDOM",
				description: "Eu não tenho permissão para banir este usuário! | **Permissão necessária: Banir membros**"
			}
		})

		const embed = new Discord.MessageEmbed()
			.setTitle("Resolute")
			.setColor("RANDOM")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.addField(`Usuário banido:`, `ﾠ<:setaaa:860626769089265665> ${usuario} | \`${usuario.id}\``)
			.addField(`Autor:`, `ﾠ<:setaaa:860626769089265665> ${message.author} | \`${message.author.id}\``)
			.addField(`Motivo:`, `ﾠ<:setaaa:860626769089265665> \`${motivo.length !== 0 ? `${motivo}` : `Sem motivos para o banimento.` }\``)
			.setFooter("Resolute - Punições", message.author.displayAvatarURL())
			.setImage(rand)
			.setTimestamp();
		message.channel.send(embed);

		const pv = new Discord.MessageEmbed()
			.setTitle("Você foi banido!")
			.setColor("#RANDOM")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.addField("Autor:", `${message.author} (${message.author.id})`)
			.addField("Motivo:", `${motivo}`)
			.setImage(rand)
			.setFooter("Resolute - Punições", message.guild.iconURL({
				dynamic: true
			}))
			.setTimestamp();
		usuario.send(pv);
		usuario.ban();
	}
}