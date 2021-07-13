const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
	name: "autorole",
	aliases: ['setautorole'],
	cooldown: 1000 * 2,
	description: "Setar o cargo automático de quando alguém entrar em seu servidor.",
	category: "config",
	usage: "@cargo",
	permissoes: "ADMINISTRATOR",
    args: true,

	async run(client, message, args) {

		if (!args[0]) return;
		if (!message.member.hasPermission(module.exports.permissoes)) return;
        
		let user = message.author;
        let cargo_autorole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

        db.set(`autorole_${message.guild.id}`, cargo_autorole.id);

		const confirma = new Discord.MessageEmbed()
			.setTitle("Autorole ativado!")
			.setColor("RANDOM")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.addField(`Requisitado por:`, `${user}`)
			.addField(`Cargo:`, `${cargo_autorole}`)
			.setFooter("Resolute", message.author.displayAvatarURL())
			.setTimestamp();
        message.channel.send(confirma);

    }
}