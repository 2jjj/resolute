const Discord = require("discord.js");

module.exports = {
	name: 'globalban',
	description: 'Banir um usuário por ID permanentemente de seu servidor.',
	cooldown: 1000 * 2,
	aliases: ['globalban'],
	category: 'mod',
	usage: "<id> <motivo>",
	example: "globalban 836345581424738354 BANIDO!!",

	async run(client, message, args) {

		if(!args[0]){
			return;
		}

		var list = [
			'https://imgur.com/ZNuAcum.gif',
			'https://imgur.com/xlD7P3N.gif',
			'https://imgur.com/cT6TUwv.gif',
			'https://imgur.com/7l7n5un.gif',
			'https://imgur.com/NYZsPRx.gif',
			'https://imgur.com/gVAiCX6.gif',
			'https://imgur.com/usOD4UR.gif',
			'https://imgur.com/4uDadjQ.gif'
		]

		var rand = list[Math.floor(Math.random() * list.length)]

		if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('<:x_:856894534071746600> **|** Você não tem a permissão de  \`BAN_MEMBERS\`')
		if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.reply('<:x_:856894534071746600> **|** Eu não tenho a permissão de \`BAN_MEMBERS\`')
		let userID = args[0]
		let reason = args.slice(1).join(' ') || 'Sem razão especificada.'

		if (userID === message.author.id) return message.reply('<:x_:856894534071746600> **|** Você não pode se banir.')
		if (userID == client.user.id) return message.reply('<:x_:856894534071746600> **|** Você não pode me banir com o **meu própio** comando.')

		client.users.fetch(userID).then(async (user) => {
			await message.guild.members.ban(user.id, {
				reason: reason
			})
			const bannedEmbed = new Discord.MessageEmbed()
				.setColor('RED')
				.setDescription(`<@${user.id}> foi banido por ${message.author} razão: \`${reason}\``)
			message.channel.send(bannedEmbed)

			client.modlogs({
				Member: user,
				Color: 'RED',
				Reason: reason,
				Action: 'Global ban'
			}, message)

		}).catch(err => {
			console.log(err)
		})


	}
}