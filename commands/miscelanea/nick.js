const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
	name: "nick",
	aliases: [],
	cooldown: 1000 * 2,
	description: "Alterar o apelido para um determinado usuário",
	category: "outros",
	usage: "@user <apelido>",
	example: "nick @Spray#0007 Apelido novo",

	async run(client, message, args) {

		if(!args[0]){
			return;
		}

		const member = message.mentions.members.first();
		const arguments = args.slice(1).join(" ");

		try {
			member.setNickname(arguments);
		} catch (err) {
			console.log(err);
			message.reply(
				"Eu não tenho permissão de setar o nickname!"
			);
		}
	},
};