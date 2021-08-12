const db = require("quick.db")

module.exports = {
	name: "unlock",
	aliases: ['desbloquear'],
	cooldown: 1000 * 2,
	description: "Desbloquear o canal bloqueado anteriormente",
	category: "mod",
	usage: "",
	example: "",
	args: false,
	permissoes: {
        membro: ['MANAGE_CHANNELS', 'Gerenciar Canais'],
        bot: ['MANAGE_CHANNELS', 'Gerenciar Canais']
    },

	async run(client, message, args, cmduser, text, prefix, player) {

		if (!message.member.hasPermission(module.exports.permissoes.membro[0])) return;
		if (!message.guild.me.hasPermission(module.exports.permissoes.bot[0])) return;

		if (!db.fetch(`lock.${message.channel.id}`)) return message.channel.send(`<:x_:856894534071746600> **|** Este canal não está bloqueado.`)
		let msg = await message.channel.send(`:tada: **|** ${message.author} o canal foi desbloqueado com sucesso! Use ${prefix}}unlock para travar o canal!`)

		try {
			db.delete(`lock.${message.channel.id}`)
			message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
				SEND_MESSAGES: true,
				ADD_REACTIONS: true
			})
			msg.edit(`:tada: **|** ${message.author} o canal foi desbloqueado com sucesso! Use ${prefix}unlock para travar o canal!`)

		} catch (e) {
			message.channel.send(e)
		}
	}
}