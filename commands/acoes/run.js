const Discord = require("discord.js");

module.exports = {
	name: "run",
	aliases: ["correr"],
	cooldown: 1000 * 2,
	description: "Corra!",
	category: "gifs",
	usage: "@user",
	example: "@Spray#7725",

	async run(client, message, args) {
		
		if(!args[0]) return;

		let list = [
			'https://imgur.com/jrO1GMM.gif',
			'https://imgur.com/ZF54zRf.gif',
			'https://imgur.com/FMNN1vP.gif',
			'https://imgur.com/uc73pUM.gif',
			'https://imgur.com/f2G4KhW.gif',
			'https://imgur.com/e0Tm73Q.gif',
			'https://imgur.com/FvWMFlD.gif',
			'https://imgur.com/JMVc5eV.gif',
			'https://imgur.com/LAzrCjl.gif',
			'https://imgur.com/oy1x3vY.gif',
			'https://imgur.com/cnLaDCn.gif',
			'https://imgur.com/CcMdWIc.gif',
			'https://imgur.com/8T1FTVM.gif',
			'https://imgur.com/dvFQv8V.gif',
			'https://imgur.com/pOfg9ft.gif',
			'https://imgur.com/N1AZcwM.gif',
			'https://imgur.com/HeSF9vn.gif',
			'https://imgur.com/zu7cYC4.gif',
			'https://imgur.com/PPZUzjw.gif',
			'https://imgur.com/U6jsYVe.gif',
			'https://imgur.com/BG19Hck.gif',
			'https://imgur.com/kSnwKa3.gif',
			'https://imgur.com/hcDbowm.gif',
			'https://imgur.com/ZxCCx18.gif'
		]

		let rand = list[Math.floor(Math.random() * list.length)]
		let texto = args.join(" ")

		const embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setDescription(`${texto}`)
			.setImage(rand)

		await message.inlineReply(embed).then(msg => {
			msg.react('🔄').catch(err => {
				return
			}) // 1º Embed
			msg.react('❌').catch(err => {
				return
			})
			setTimeout(function () {
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