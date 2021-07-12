const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "maps",
	aliases: [],
	cooldown: 1000 * 2,
	description: "Comando para ver a foto de uma determinada localização pelo google maps.",
	category: "outros",
	usage: "<cidade>",
	example: "Los Angeles",
	args: true,
	
	async run(client, message, args) {

		if (!args[0]) return;

		const sit = args.join("_")
		const site = `https://maps.google.com/?q=${args.join("+")}`
		try {
			const msg = await message.channel.send('**Aguarde...** Isso pode demorar 10 segundos...')
			msg.delete({
				timeout: 5000
			})
			const {
				body
			} = await fetch(
				`https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
			);
			let att = new Discord.MessageAttachment(body, `${sit}.png`)
			return message.channel.send(att)

		} catch (err) {

			return message
				.reply(`<:1926blurplecross:856520144872407060> **|** Erro: \`${err.message}\`. Tente novamente mais tarde!`)

		};
	}
}