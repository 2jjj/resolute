const Discord = require('discord.js');

module.exports = {
	name: "hug",
	aliases: ['abraçar'],
	cooldown: 1000 * 2,
	description: "Abraçe alguém",
	category: "gifs",
	usage: "@user",
	example: "hug @Spray#0007",

	async run(client, message, args) {
		
		if(!args[0]) return;

		var list = [
			'https://imgur.com/Ch56F8E.gif',
			'https://imgur.com/E7achiC.gif',
			'https://imgur.com/kXufldu.gif'
		];

		var rand = list[Math.floor(Math.random() * list.length)];
		let user = message.mentions.users.first() || client.users.cache.get(args[0]);

		let avatar = message.author.displayAvatarURL({
			format: 'png'
		});
		const embed = new Discord.MessageEmbed()
			.setTitle('Hug')
			.setColor('#000000')
			.setDescription(`${message.author} acaba de abraçar o ${user}`)
			.setImage(rand)
			.setTimestamp()
			.setThumbnail(avatar)
			.setFooter('Resolute')
			.setAuthor(message.author.tag, avatar);
		await message.channel.send(embed);
	}
}