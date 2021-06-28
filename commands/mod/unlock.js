const db = require("quick.db")

module.exports = {
	name: "unlock",
	aliases: ['desbloquear'],
	cooldown: 1000 * 2,
	description: "Desbloquear o canal bloqueado anteriormente",
	category: "mod",
	usage: "lock",
	example: "lock",

	async run(client, message, args) {

		let prefix = db.get(`prefix_${message.guild.id}`)
		if (prefix === null) prefix = "s."

		if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`<:x_:856894534071746600> **|** Você não possui a permissão de \`GERENCIAR CANAIS\``);
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