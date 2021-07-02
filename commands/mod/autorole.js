const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
	name: "autorole",
	aliases: ['setautorole'],
	cooldown: 1000 * 2,
	description: "Setar o cargo automático de quando alguém entrar em seu servidor.",
	category: "mod",
	usage: "@cargo",
	example: "autorole @Membros",

	async run(client, message, args) {

        let user = message.author;
        let error = "Lembre-se de mencionar um cargo";
        let error_completo = `:x: ${user} | ${error}.`;

        if (!args[0]) return message.channel.send(error_completo)
		if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("<:mod:856894534088523776> **|** Sem permissão para executar este comando! | Permissão necessária:ADMINISTRATOR ")

        let cargo_autorole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

        db.set(`autorole_${message.guild.id}`, cargo_autorole.id);

		const confirma = new Discord.MessageEmbed()
			.setTitle("Autorole ativado!")
			.setColor("#ff0000")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.addField(`Autor:`, `${user}`)
			.addField(`Cargo:`, `${cargo_autorole}`)
			.setFooter("Resolute", message.author.displayAvatarURL())
			.setTimestamp();
        message.channel.send(confirma);

    }
}