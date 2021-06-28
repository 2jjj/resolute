module.exports = {
	name: "unmute",
	aliases: [],
	cooldown: 1000 * 2,
	description: "Desmutar alguém",
	category: "mod",
	usage: "@user",

	async run(client, message, args) {

		const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
		const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

		await Member.roles.remove(role)

		message.channel.send(`<:v_:856894534184468480> **|** ${Member.displayName} foi desmutado com sucesso!`)
	}
}