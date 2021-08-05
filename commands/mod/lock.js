const db = require("quick.db");

module.exports = {
	name: "lock",
	aliases: ['bloquear'],
	cooldown: 1000 * 2,
	description: "Bloquear o canal que você usou este comando.",
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

		if (db.fetch(`lock.${message.channel.id}`)) return message.reply("<a:SETA:852194614927818812> Este canal já está bloqueado.")
		let msg = await message.channel.send("Sucesso!")

		try {
			db.set(`lock.${message.channel.id}`, message.author.id)
			message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
				SEND_MESSAGES: false,
				ADD_REACTIONS: false
			})
			msg.edit(`:tada: **|** ${message.author} este canal foi bloqueado com sucesso! **|** Use ${prefix}unlock para destravar!`)

		} catch (e) {
			message.channel.send(e)
		}
	}
}