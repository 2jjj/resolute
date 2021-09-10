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

    async run(client, message, args, prefix) {

		if (!message.member.permissions.has(module.exports.permissoes.membro[0])) return;
		if (!message.guild.me.permissions.has(module.exports.permissoes.bot[0])) return;

		if (db.fetch(`lock.${message.channel.id}`)) return message.reply("Este canal já está bloqueado.")
		let msg = await message.channel.send("Sucesso!")

		try {
			db.set(`lock.${message.channel.id}`, message.author.id)
			message.channel.permissionOverwrites.edit(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
				SEND_MESSAGES: false,
				ADD_REACTIONS: false
			})
			msg.edit(`:tada: **|** ${message.author} este canal foi bloqueado com sucesso! **|** Use \`${prefix}unlock\` para destravar!`)

		} catch (e) {
			console.log(e)
			message.reply(e)
		}
	}
}