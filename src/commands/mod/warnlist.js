const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
	name: "warnlist",
	aliases: ['userwarns'],
	cooldown: 1000 * 2,
	description: "Veja os warns de um determinado usuário!",
	category: "mod",
	usage: "@user",
	example: "",
	permissoes: [],
	args: false,

	async run(client, message, args) {

		let user = message.mentions.members.first() || message.author;
		let warns = await db.get(`warnsCount_${message.guild.id}-${user.id}`) || 0;

		const embed = new Discord.MessageEmbed()
			.setTitle(':scales: | Warnlist')
			.setColor("RANDOM")
			.setDescription(`🔹 **${user} Tem ${warns} Warns \n🔹 ** Siga as regras para não sofrer advertencia!`)
			.setFooter(
				`Requisitado por ${message.author.tag}`,
				message.author.displayAvatarURL({
					dynamic: true
				})
			)
		message.channel.send(embed);
	}
}