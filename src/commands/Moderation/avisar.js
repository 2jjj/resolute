const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
	name: "avisar",
	aliases: ['warn', 'aviso'],
	cooldown: 1000 * 2,
	description: "Avisar uma pessoa com aviso na dm e acrescentar warns no warnlist(ps: quando o usuário receber 3 warns ele será banido.)",
	category: "mod",
	usage: "@user <motivo>",
	example: "@Spray#7725 Ofensa a staff",
	args: true,
	permissoes: {
        membro: ['ADMINISTRATOR', 'Administrador'],
        bot: ['ADMINISTRATOR', 'Administrador']
    },

	async run(client, message, args) {

		if (!args[0]) return;
		if (!message.member.hasPermission(module.exports.permissoes.membro[0])) return;
		if (!message.guild.me.hasPermission(module.exports.permissoes.bot[0])) return;

		let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
		var warns = await db.get(`warnsCount_${message.guild.id}-${membro.id}`) || 0;

		if (!message.member.roles.highest > membro.roles.highest) {
			return message.channel.send(`<:x_:856894534071746600> **|** ${message.author}, você não pode dar warn nesse usuário, pois o cargo dele é superior ao seu!`);
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
		let motivo = args.slice(1).join(" ");

		let embed1 = new Discord.MessageEmbed()
			.setTitle("Resolute")
			.setColor("RANDOM")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.addField(`Usuário avisado:`, `ﾠ<:setaaa:860626769089265665> ${membro} | \`${membro.id}\``)
			.addField(`Autor:`, `ﾠ<:setaaa:860626769089265665> ${message.author} | \`${message.author.id}\``)
			.addField(`Motivo:`, `ﾠ<:setaaa:860626769089265665> \`${motivo.length !== 0 ? `${motivo}` : `Sem motivos para o banimento.` }\``)
			.setFooter("Resolute - Punições", message.author.displayAvatarURL())
			.setImage(rand)
			.setTimestamp();
			
		let embed = new Discord.MessageEmbed() //${membro.username}
			.setTitle(`Você foi avisado!`)
			.setColor("RANDOM")
			.setFooter(`Staff responsável: ${message.author.username}`, message.author.displayAvatarURL())
			.setImage(rand)
			.setDescription(`<:setaaa:860626769089265665> \`${motivo.length !== 0 ? `${motivo}` : `Sem motivos para o warn.` }\``)

		membro.send(embed)
		message.channel.send(embed1)
		await db.add(`warnsCount_${message.guild.id}-${membro.id}`, 1)

		if(warns >= 3) {
			let embed_adv = new Discord.Embed()
			.setTitle("Resolute")
			.setColor("RANDOM")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.setDescription(`O usuário ${membro} foi **banido** por atingir 3 advertências!`)
			.setTimestamp();
			
			message.channel.send(embed_adv)
			db.subtract(`warnsCount_${message.guild.id}-${membro.id}`, 3)
			membro.ban()
		}
	}
}