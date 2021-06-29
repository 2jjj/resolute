const fetch = require("node-fetch")

module.exports = {
	name: "discordjs",
	aliases: ['docs', 'discord.js'],
	cooldown: 1000 * 2,
	description: "Comando para pesquisar algo nas docs do discord.js",
	category: "outros",
	usage: "<docs_name>",
    example: "discordjs message",

	async run(client, message, args) {

		if (!args[0]) return;


		const query = args.join("")

		fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${query}`)
			.then(res => res.json())
			.then(json => {
				message.channel.send({
					embed: json
				}).catch(() => message.reply("Não achei nenhum resultado para a sua pesquisa!"))

			})
	}
}