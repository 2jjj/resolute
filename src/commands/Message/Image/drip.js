const Discord = require("discord.js");
module.exports = {
	name: "drip",
	aliases: [],
	cooldown: 1000 * 2,
	description: "",
	category: "manipulacao",
	usage: "",
	example: "",
	permissoes: {
		membro: [],
		bot: ['ATTACH_FILES', 'Anexar arquivos']
	},
    args: false,

	async run(client, message, args) {
		    
		if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;

		const user = message.mentions.users.first() || message.author;
		const img = `https://api.popcatdev.repl.co/drip?image=${user.displayAvatarURL({ dynamic: false, format: "png" })}`
		const attachment = new Discord.MessageAttachment(img, `Drip_${user.username}.jpg`);
		message.reply({ files: [attachment] });
	}
}