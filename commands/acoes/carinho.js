const Discord = require('discord.js')

module.exports = {
	name: "carinho",
	aliases: [],
	cooldown: 1000 * 2,
	description: "carinho em alguém.",
	category: "gifs",
	usage: "@user",
	example: "@Spray#7725",

	async run(client, message, args) {
		
		if(!args[0]) return;

		var list = [
			'https://imgur.com/2lacG7l.gif',
			'https://imgur.com/UWbKpx8.gif',
			'https://imgur.com/4ssddEQ.gif',
			'https://imgur.com/2k0MFIr.gif',
			'https://imgur.com/nPr3s5D.gif',
			'https://imgur.com/LUypjw3.gif',
			'https://imgur.com/F3cjr3n.gif',
			'https://imgur.com/NNOz81F.gif',
			'https://imgur.com/cqIJIh4.gif',
			'https://imgur.com/5OQMI1m.gif',
			'https://imgur.com/48c0jVX.gif',
			'https://imgur.com/Iq9eZ5o.gif'
		]

		var list1 = [
			'https://imgur.com/2lacG7l.gif',
			'https://imgur.com/UWbKpx8.gif',
			'https://imgur.com/4ssddEQ.gif',
			'https://imgur.com/2k0MFIr.gif',
			'https://imgur.com/nPr3s5D.gif',
			'https://imgur.com/LUypjw3.gif',
			'https://imgur.com/F3cjr3n.gif',
			'https://imgur.com/NNOz81F.gif',
			'https://imgur.com/cqIJIh4.gif',
			'https://imgur.com/5OQMI1m.gif',
			'https://imgur.com/48c0jVX.gif',
			'https://imgur.com/Iq9eZ5o.gif'
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
			.setDescription(`${message.author} está dando carinho nx ${user}`, avatar)
			.setImage(rand)
			.setFooter('Clique em 🔁 para retribuir')

		var embed2 = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setDescription(`${user} também acariciou você ${message.author} `, avatar1)
			.setImage(rand1)

		await message.inlineReply(embed).then(msg => {
			msg.react('🔁')
			msg.awaitReactions((reaction, user) => {
				if (message.mentions.users.first().id !== user.id) return

				if (reaction.emoji.name === '🔁') {
					return message.inlineReply(embed2)
				}
			})
		})
	}
}