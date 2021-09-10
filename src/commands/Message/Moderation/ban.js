const Discord = require("discord.js");

module.exports = {
	name: "ban",
	aliases: ['banir'],
	cooldown: 1000 * 2,
	description: "Banir um usuário permanentemente de seu servidor com aviso na dm.",
	category: "mod",
	usage: "@usuario <motivo>",
	example: "@Spray#7725 Ofensa a staff",
	args: true,
	permissoes: {
        membro: ['BAN_MEMBERS', 'Banir Membros'],
        bot: ['BAN_MEMBERS', 'Banir Membros']
    },

	async run(client, message, args) {

		if (!args[0]) return;
		if (!message.member.permissions.has(module.exports.permissoes.membro[0])) return;
		if (!message.guild.me.permissions.has(module.exports.permissoes.bot[0])) return;

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

		let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
		const motivo = args.slice(1).join(" ");

		if (membro.id == client.user.id) {
			return message.channel.send(`<:outline_clear_black_24dp:884962739007672390> **|** ${message.author}, você não pode me banir!`);
		};

		if (membro.id == message.author.id) {
			return message.channel.send(`<:outline_clear_black_24dp:884962739007672390> **|** ${message.author}, você não pode se **Auto-Banir** nesse servidor!`);
		};

		if (!message.member.roles.highest > membro.roles.highest) {
			return message.channel.send(`<:outline_clear_black_24dp:884962739007672390> **|** ${message.author}, você não pode banir este membro, pois ele tem o cargo mais maior que o seu!`);
		};

		if (!message.guild.me.roles.highest > membro.roles.highest) {
			return message.channel.send(`<:outline_clear_black_24dp:884962739007672390> **|** ${message.author}, eu não posso banir este membro, pois ele tem o cargo maior que o meu!`);
		};

		if (!membro.bannable) {
			return message.channel.send(`<:outline_clear_black_24dp:884962739007672390> **|** ${message.author}, eu não consigo banir esse membro!`);
		};

		const embed = new Discord.MessageEmbed()
			.setTitle("Resolute")
			.setColor("RANDOM")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.addField(`Usuário banido:`, `ﾠ<:outline_arrow_right_alt_black_24:884959628973178910> ${membro.user} | \`${membro.id}\``)
			.addField(`Autor:`, `ﾠ<:outline_arrow_right_alt_black_24:884959628973178910> ${message.author} | \`${message.author.id}\``)
			.addField(`Motivo:`, `ﾠ<:outline_arrow_right_alt_black_24:884959628973178910> \`${motivo.length !== 0 ? `${motivo}` : `Sem motivos para o banimento.` }\``)
			.setFooter("Resolute - Punições", message.author.displayAvatarURL())
			.setImage(rand)
			.setTimestamp();
		message.reply({ embeds: [embed] });

		const pv = new Discord.MessageEmbed()
			.setTitle("Você foi banido!")
			.setColor("RANDOM")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.addField(`Autor:`, `ﾠ<:outline_arrow_right_alt_black_24:884959628973178910> ${message.author} | \`${message.author.id}\``)
			.addField(`Motivo:`, `ﾠ<:outline_arrow_right_alt_black_24:884959628973178910> \`${motivo.length !== 0 ? `${motivo}` : `Sem motivos para o banimento.` }\``)
			.setImage(rand)
			.setFooter("Resolute - Punições", message.guild.iconURL({
				dynamic: true
			}))
			.setTimestamp();
		membro.send({ embeds: [pv] });
		membro.ban({ reason: `Banido por ${message.author.username}#${message.author.discriminator} (${message.author.id}) ` });
	}
}