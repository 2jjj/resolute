const Discord = require("discord.js");

module.exports = {
	name: 'globalban',
	description: 'Banir um usuário por ID permanentemente de seu servidor.',
	cooldown: 1000 * 2,
	aliases: ['globalban'],
	category: 'mod',
	usage: "<id> <motivo>",
	example: "836345581424738354 Tentou burlar o ban...",
	args: true,
	permissoes: {
        membro: ['BAN_MEMBERS', 'Banir Membros'],
        bot: ['BAN_MEMBERS', 'Banir Membros']
    },

	async run(client, message, args) {

		if (!args[0]) return;
		if (!message.member.hasPermission(module.exports.permissoes.membro[0])) return;
		if (!message.guild.me.hasPermission(module.exports.permissoes.bot[0])) return;
		
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
		
		let userID = args[0]
		let motivo = args.slice(1).join(' ')

		if (userID === message.author.id) return message.reply('<:x_:856894534071746600> **|** Você não pode se banir.')
		if (userID == client.user.id) return message.reply('<:x_:856894534071746600> **|** Você não pode me banir com o **meu própio** comando.')

		client.users.fetch(userID).then(async (user) => {

			await message.guild.members.ban(user.id, {
				reason: motivo
			})
			const bannedEmbed = new Discord.MessageEmbed()
				.setTitle("Resolute")
				.setColor("RANDOM")
				.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
				.addField(`Usuário banido:`, `ﾠ<:setaaa:860626769089265665> \`${userID}\``)
				.addField(`Autor:`, `ﾠ<:setaaa:860626769089265665> ${message.author} | \`${message.author.id}\``)
				.addField(`Motivo:`, `ﾠ<:setaaa:860626769089265665> \`${motivo.length !== 0 ? `${motivo}` : `Sem motivos para o banimento.` }\``)
				.setFooter("Resolute - Punições", message.author.displayAvatarURL())
				.setImage(rand)
				.setTimestamp();
			message.channel.send(bannedEmbed)

		}).catch(err => {
			console.log(err)
		})


	}
}