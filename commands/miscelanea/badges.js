module.exports = {
	name: "badges",
	aliases: ['insigneas'],
	cooldown: 1000 * 2,
	description: "Veja suas insigneas do discord",
	category: "outros",
	usage: "<@user>",
	example: "badges @Spray#7725",


	async run(client, message, args) {

		const user = message.mentions.users.first() || message.author;
		const flags = user.flags.toArray();

		message.channel.send(`Insigneas de ${user}: ${flags.join(', ')}`)
	}
}