const Discord = require("discord.js")

module.exports = {
	name: "kick",
	aliases: ['expulsar'],
	cooldown: 1000 * 2,
	description: "Expulsar uma pessoa de seu servidor.",
	category: "mod",
	usage: "@user <motivo>",
	example: "@Spray#7725 Quebrou a tos do discord.",
	args: true,
	permissoes: {
        membro: ['KICK_MEMBERS', 'Expulsar Membros'],
        bot: ['KICK_MEMBERS', 'Expulsar Membros']
    },
	
	async run(client, message, args) {

		if (!args[0]) return;
		if (!message.member.hasPermission(module.exports.permissoes[0])) return;
		if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;

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
		let membro = message.mentions.members.first()
		let motivo = args.slice(1).join(' ')

		if (membro.id == client.user.id) {
			return message.channel.send(`<:x_:856894534071746600> **|** ${message.author}, você não pode me expulsar!`);
		};

		if (membro.id == message.author.id) {
			return message.channel.send(`<:x_:856894534071746600> **|** ${message.author}, você não pode se **Auto-Expulsar** nesse servidor!`);
		};

		if (!message.member.roles.highest > membro.roles.highest) {
			return message.channel.send(`<:x_:856894534071746600> **|** ${message.author}, você não pode expulsar esse membro, pois ele tem o cargo mais maior que o seu!`);
		};

		if (!message.guild.me.roles.highest > membro.roles.highest) {
			return message.channel.send(`<:x_:856894534071746600> **|** ${message.author}, eu não posso expulsar o membro que possui o cargo maior que o meu!`);
		};

		if (!membro.kickable) {
			return message.channel.send(`<:x_:856894534071746600> **|** ${message.author}, você não possui permissão para expulsar este membro!`);
		};

		let embed2 = new Discord.MessageEmbed()
			.setDescription(`**O membro ${membro} foi expulso do servidor!**`)
			.setColor("RANDOM")
			.addField("Usuário", `ﾠ<:setaaa:860626769089265665> ${membro}`)
			.addField("Moderador", `ﾠ<:setaaa:860626769089265665> ${message.author}`)
			.addField(`Motivo:`, `ﾠ<:setaaa:860626769089265665> \`${motivo.length !== 0 ? `${motivo}` : `Sem motivos.` }\``)
			.setImage(rand)
		await message.channel.send(embed2)
		await membro.kick(motivo)
	}
}