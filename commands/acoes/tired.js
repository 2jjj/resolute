const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
	name: "tired",
	aliases: [],
	cooldown: 1000 * 2,
	description: "to cansado ~ spray",
	category: "gifs",
	usage: "@user",

	async run(client, message, args) {

		let list = [
			'https://imgur.com/Gkel36E.gif',
			'https://imgur.com/BVSgNuq.gif',
			'https://imgur.com/XohOnWv.gif',
			'https://imgur.com/d8QQgnf.gif',
			'https://imgur.com/HYpSxgw.gif',
			'https://imgur.com/k51u431.gif',
			'https://imgur.com/SHtdL4s.gif',
			'https://imgur.com/YQz7bUL.gif',
			'https://imgur.com/xjxB8bx.gif',
			'https://imgur.com/hBHsV3N.gif',
			'https://imgur.com/RhpBfgg.gif'
		]

		let rand = list[Math.floor(Math.random() * list.length)]
		let texto = args.join(" ")
		if (!texto) {
			let prefix = db.get(`prefix_${message.guild.id}`)
			if (prefix === null) prefix = "s."

			const help = new Discord.MessageEmbed()
				.setTitle("Comando de tired")
				.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
				.setDescription("Ai que cansaço!!")
				.addField(`Forma de Utilização:`, ` \`${prefix}tired @usuario\``)
				.setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({
					dynamic: true
				}))
				.setImage(rand)
				.setTimestamp();
			return message.channel.send(help);
		}

		const embed = new Discord.MessageEmbed()
			.setColor('BLUE')
			.setDescription(`${texto}`)
			.setImage(rand)

		await message.inlineReply(embed).then(msg => {
			msg.react('🔄').catch(err => {
				return
			}) // 1º Embed
			msg.react('❌').catch(err => {
				return
			})
			setTimeout(function() {
				msg.reactions.removeAll().catch(err => {
					return
				})
			}, 30000)

			msg.awaitReactions((reaction, user) => {
				if (message.author.id !== user.id) return;

				if (reaction.emoji.name === '🔄') { // 1º Embed - Principal
					reaction.users.remove(user)

					const embed = new Discord.MessageEmbed()
						.setColor('BLUE')
						.setDescription(`${texto}`)
						.setImage(list[Math.floor(Math.random() * list.length)])
					msg.edit(embed)
				}
				if (reaction.emoji.name === '❌') {
					msg.delete().catch(err => {
						return
					})
				}
			})
		})
	}
}