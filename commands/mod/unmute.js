module.exports = {
	name: "unmute",
	aliases: [],
	cooldown: 1000 * 2,
	description: "Desmutar um usuário que foi mutado anteriormente.",
	category: "mod",
	usage: "@user",
	example: "unmute @Spray#0007",

	async run(client, message, args) {

		if(!args[0]){
			return;
		}

		const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
		const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

		await Member.roles.remove(role)

		message.channel.send(`<:v_:856894534184468480> **|** ${Member.displayName} foi desmutado com sucesso!`)
	}
}