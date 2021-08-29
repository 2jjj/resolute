module.exports = {
	name: "unmute",
	aliases: [],
	cooldown: 1000 * 2,
	description: "Desmutar um usuário que foi mutado anteriormente.",
	category: "mod",
	usage: "@user",
	example: "@Spray#7725",
	args: true,
	permissoes: {
        membro: ['MANAGE_MESSAGES', 'Gerenciar Mensagens'],
        bot: ['MANAGE_MESSAGES', 'Gerenciar Mensagens']
    },
	
	async run(client, message, args) {

		if(!args[0]) return;
		if (!message.member.permissions.has(module.exports.permissoes.membro[0])) return;
		if (!message.guild.me.permissions.has(module.exports.permissoes.bot[0])) return;

		let motivo = args.slice(1).join(' ')

		const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
		const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

		await Member.roles.remove(role)

		const embed = new Discord.MessageEmbed()
			.setTitle("Resolute")
			.setColor("RANDOM")
			.setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
			.addField(`Usuário desmutado:`, `ﾠ<:setaaa:860626769089265665> ${Member} | \`${Member.id}\``)
			.addField(`Autor:`, `ﾠ<:setaaa:860626769089265665> ${message.author} | \`${message.author.id}\``)
			.addField(`Motivo:`, `ﾠ<:setaaa:860626769089265665> \`${motivo.length !== 0 ? `${motivo}` : `Sem motivos.` }\``)
			.setFooter("Resolute - Punições", message.author.displayAvatarURL())
			.setImage(rand)
			.setTimestamp();
		message.inlineReply(embed);
	}

}