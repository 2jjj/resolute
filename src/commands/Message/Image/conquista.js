const Discord = require('discord.js');

module.exports = {
	name: "conquista",
	aliases: [],
	cooldown: 1000 * 2,
	description: "Conquista do minecraft.",
	category: "manipulacao",
	usage: "<texto>",
	example: "oi galera",
	permissoes: {
		membro: [],
		bot: ['ATTACH_FILES', 'Anexar arquivos']
	},
	args: true,
	
	async run(client, message, args) {
    
		if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;

		const a = args.join("+")
		
		if (!a) return;

		if (args.join("+").length > 20) return message.channel.send(`**Use no maximo 20 caracteres!**`);

		const embed_conquista = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setImage(`https://minecraftskinstealer.com/achievement/${Math.floor(Math.random() * 39) + 1}/Achievement+Get%21/${a}`);

		message.reply({ embeds: [embed_conquista] })
	}

}