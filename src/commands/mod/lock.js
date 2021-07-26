const db = require("quick.db");
const GuildSettings = require("../../database/mongoDB/settings");

module.exports = {
	name: "lock",
	aliases: ['bloquear'],
	cooldown: 1000 * 2,
	description: "Bloquear o canal que você usou este comando.",
	category: "mod",
	usage: "",
	example: "",
	permissoes: ["MANAGE_CHANNELS", "Gerenciar Canais"],
	args: false,

	async run(client, message, args) {

		var storedSettings = await GuildSettings.findOne({
			gid: message.guild.id
		});
		if (!storedSettings) {
			const newSettings = new GuildSettings({
				gid: message.guild.id
			});
			await newSettings.save().catch(() => {});
			storedSettings = await GuildSettings.findOne({
				gid: message.guild.id
			});
		}

		console.log(storedSettings.prefix)


		if (!message.member.hasPermission(module.exports.permissoes[0])) return;
		if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;


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