const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
	name: "nick",
	aliases: [],
	cooldown: 1000 * 2,
	description: "Setar Nickname",
	category: "mod",
	usage: "",

	async run(client, message, args) {

		const member = message.mentions.members.first();

		if (!member) {
			let prefix = db.get(`prefix_${message.guild.id}`)
			if (prefix === null) prefix = "s."

			const help = new Discord.MessageEmbed()
				.setTitle("Comando de nick")
				.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
				.setDescription("Adicione um apelido a um usuário")
				.addField(`Forma de Utilização:`, `<:pontin:852197383974551582> \`${prefix}nick @user <apelido>\``)
				.setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({
					dynamic: true
				}))
				.setColor("RANDOM")
				.setTimestamp();
			return message.channel.send(help);
		}

		const arguments = args.slice(1).join(" ");

		if (!arguments) return message.reply("Especifique o nickname que deseja colocar!");

		try {
			member.setNickname(arguments);
		} catch (err) {
			console.log(err);
			message.reply(
				"<:x_:856894534071746600> **|** Eu não tenho permissão de setar " + member.toString() + " nickname!"
			);
		}
	},
};