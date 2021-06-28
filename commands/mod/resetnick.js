const db = require("quick.db");
const Discord = require("discord.js");


module.exports = {
	name: "resetnick",
	aliases: [],
	cooldown: 1000 * 2,
	description: "Resetar o nick de um usuário.",
	category: "mod",
	usage: "@user",

	async run(client, message, args) {

		const member = message.mentions.members.first();

		try {
			member.setNickname(null);
		} catch (err) {
			message.channel.send(
				"<:x_:856894534071746600> **|** Eu não tenho permissão para resetar " + member.toString() + " nickname!"
			);
		}
	},
};