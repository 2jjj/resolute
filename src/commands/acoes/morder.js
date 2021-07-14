const Discord = require('discord.js')

module.exports = {
	name: "morder",
	aliases: [],
	cooldown: 1000 * 2,
	description: "Morda alguém",
	category: "acoes",
	usage: "@user",
	example: "@Spray#7725",
    args: true,

	async run(client, message, args) {
		
		if(!args[0]) return;

		var list = [
			'https://imgur.com/0sQbStr.gif',
			'https://imgur.com/6Y5OnND.gif',
			'https://imgur.com/yjZCLpx.gif',
			'https://imgur.com/ymAPVpI.gif',
			'https://imgur.com/WqxrEhg.gif',
			'https://imgur.com/r04g2cj.gif',
			'https://imgur.com/bz1zkXQ.gif',
			'https://imgur.com/h9xSaJn.gif',
			'https://imgur.com/vJ6iLlH.gif',
			'https://imgur.com/lprVmaI.gif',
			'https://imgur.com/LAVnPlM.gif',
			'https://imgur.com/ntOXxqx.gif'
		]

		var list1 = [
			'https://imgur.com/0sQbStr.gif',
			'https://imgur.com/6Y5OnND.gif',
			'https://imgur.com/yjZCLpx.gif',
			'https://imgur.com/ymAPVpI.gif',
			'https://imgur.com/WqxrEhg.gif',
			'https://imgur.com/r04g2cj.gif',
			'https://imgur.com/bz1zkXQ.gif',
			'https://imgur.com/h9xSaJn.gif',
			'https://imgur.com/vJ6iLlH.gif',
			'https://imgur.com/lprVmaI.gif',
			'https://imgur.com/LAVnPlM.gif',
			'https://imgur.com/ntOXxqx.gif'
		]

		var rand = list[Math.floor(Math.random() * list.length)]
		var rand1 = list1[Math.floor(Math.random() * list1.length)]
		let user = message.mentions.users.first()

		if (user.id === message.author.id) {
			return message.inlineReply('Você não pode usar este comando com você mesmo.')
		}

		let avatar = message.author.displayAvatarURL({
			format: 'png'
		})
		let avatar1 = user.displayAvatarURL({
			format: 'png'
		})
		var embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setAuthor(message.author.username + ` está mordendo o ${user.username}`, avatar)
			.setImage(rand)
			.setFooter('Clique em 🔁 para retribuir')

		var embed2 = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setAuthor(user.username + ` retribuiu a mordida de ${message.author.username}`, avatar1)
			.setImage(rand1)

		await message.inlineReply(embed).then(msg => {
			msg.react('🔁')
			msg.awaitReactions((reaction, user) => {
				if (message.mentions.users.first().id !== user.id) return

				if (reaction.emoji.name === '🔁') {
					reaction.users.remove()
					return message.inlineReply(embed2)
				}
			})
		})
	}
}