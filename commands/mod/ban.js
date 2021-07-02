const Discord = require("discord.js");

module.exports = {
	name: "ban",
	aliases: ['banir'],
	cooldown: 1000 * 2,
	description: "Banir um usuário permanentemente de seu servidor com aviso na dm.	",
	category: "mod",
	usage: "@usuario <motivo>",
	example: "ban @Spray#0007 Ofensa a staff",

	async run(client, message, args) {

		if(!args[0]) {
			return;
		}

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

		if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send({
			embed: {
				color: "#ff0000",
				description: "Você não tem permissão para utilizar este comando! | Permissão necessária: BAN_MEMBERS"
			}
		})

		const usuario = message.mentions.members.first()
		const motivo = args.slice(1).join(" ");

		if (!usuario.bannable) return message.channel.send({
			embed: {
				color: "#ff0000",
				description: "Eu não tenho permissão para banir este usuário! | **Permissão necessária: BAN_MEMBERS**"
			}
		})

		const embed = new Discord.MessageEmbed()
			.setTitle("Novo Banimento!")
			.setColor("#ff0000")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.addField(`Usuário:`, `${usuario} (${usuario.id})`)
			.addField(`Autor:`, `${message.author} (${message.author.id})`)
			.addField(`Motivo:`, `${motivo}`)
			.setFooter("Resolute - Punições", message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);

		const pv = new Discord.MessageEmbed()
			.setTitle("Você foi banido!")
			.setColor("#ff0000")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.addField("<:mod:856894534088523776> Autor:", `${message.author} (${message.author.id})`)
			.addField("<:mod:856894534088523776> Motivo:", `${motivo}`)
			.setImage(rand)
			.setFooter("Resolute - Punições", message.guild.iconURL({
				dynamic: true
			}))
			.setTimestamp();
		usuario.send(pv);
		usuario.ban();
	}
}