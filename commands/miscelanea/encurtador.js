const tiny = require('tinyurl')

module.exports = {
	name: "encurtar",
	aliases: ['shorturl', 'encurtador'],
	cooldown: 1000 * 2,
	description: "Com este comando você pode encurtar qualquer url por ai!",
	category: "outros",
	usage: "<url>",
	example: "encurtar youtube.com",

	async run(client, message, args) {

		if (!args[0]) return;

		let url = args[0]
		if (url) {
			tiny.shorten(url, function(res, err) {
				message.channel.send(`<:8512blurplelink:856520144843046922> **|** Sua URL foi encurtada com sucesso! **|** ${res}`)
			})
		}
	}
}