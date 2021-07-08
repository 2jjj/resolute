const db = require("quick.db");
const Discord = require("discord.js");


module.exports = {
	name: "resetnick",
	aliases: [],
	cooldown: 1000 * 2,
	description: "Resetar o apelido de um usuário para o nick dele padrão",
	category: "outros",
	usage: "@user",
	example: "@Spray#7725",

	async run(client, message, args) {

		if(!args[0]){
			return;
		}

		const member = message.mentions.members.first();

		try {
			member.setNickname(null);
		} catch (err) {
			message.channel.send(
				"Eu não tenho permissão para resetar o nickname!"
			);
		}
	},
};