const Discord = require("discord.js");

module.exports = {
	name: "avatar",
	aliases: ['av', 'icon'],
	cooldown: 1000 * 2,
	description: "Pegue um avatar de alguém!",
	category: "info",
	usage: "<@user>",
	example: "@Spray#7725",
	permissoes: [],
	args: false,

	async run(client, message, args) {

		let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
		let avatar = user.avatarURL({
			dynamic: true,
			format: "png",
			size: 1024
		});

		let embed = new Discord.MessageEmbed()
			.setColor(`RANDOM`)
			.setTitle(`:frame_photo: Avatar de ${user.username}`)
			.setDescription(`Clique [aqui](${avatar}) para baixar a imagem!`)
			.setImage(avatar)
			.setFooter(`» Requisitado por: ${message.author.tag}`, message.author.displayAvatarURL({
				format: "png"
			}));
		await message.channel.send(embed);

	}
}