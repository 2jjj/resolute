const Discord = require("discord.js")

module.exports = {
	name: "servericon",
	aliases: ['serveravatar'],
	cooldown: 1000 * 2,
	description: "Comando para ver o icone do servidor.",
	category: "misc",
	usage: "",
	example: "",
	permissoes: [],
	args: false,

	async run(client, message, args) {

		let icone = new Discord.MessageEmbed()
		    .setColor('#2F3136')
			.setDescription(`**Clique [aqui](${message.guild.iconURL()}) para baixar o ícone do servidor!**`)
			.setImage(message.guild.iconURL({
				dynamic: true,
				size: 2048
			}))
		message.reply({ embeds: [icone] })
	}
}