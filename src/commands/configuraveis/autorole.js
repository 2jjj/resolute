const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
	name: "autorole",
	aliases: ['setautorole'],
	cooldown: 1000 * 2,
	description: "Setar o cargo automático de quando alguém entrar em seu servidor.",
	category: "config",
    usage: "<@cargo>",
    example: "@Membros",
	permissoes: ["ADMINISTRATOR", "Administrador"],
	args: true,

	async run(client, message, args) {

		if (!args[0]) return;
		if (!message.member.hasPermission(module.exports.permissoes[0])) return;
		if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;

		let cargo_autorole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

		db.set(`autorole_${message.guild.id}`, cargo_autorole.id);
		db.set(`autorole_config_${message.guild.id}`, true)

		const confirma = new Discord.MessageEmbed()
			.setTitle("Autorole ativado!")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.addField(`Autor:`, `ﾠ<:setaaa:860626769089265665> ${message.author} | \`${message.author.id}\``)
			.addField(`Cargo:`, `ﾠ<:setaaa:860626769089265665> ${cargo_autorole}`)
			.setFooter("Resolute - Autorole", message.author.displayAvatarURL())
			.setTimestamp();
		message.channel.send(confirma);

	}
}