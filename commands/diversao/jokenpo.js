const Discord = require('discord.js')
const db = require("quick.db")

module.exports = {
	name: "jokenpo",
	aliases: ['pedrapapeltesoura'],
	cooldown: 1000 * 2,
	description: "Jogue pedra papel e tesoura!",
	category: "fun",
	usage: "",
    example: "",

	async run(bot, message, args) {
		
		let embed = new Discord.MessageEmbed()
			.setTitle("Pedra, Papel e Tesoura!")
			.setDescription("Reaja para jogar!")
			.setTimestamp()
		let msg = await message.channel.send(embed)
		await msg.react("<:Stone:849087811188686968>")
		await msg.react("✂")
		await msg.react("📰")

		const filter = (reaction, user) => {
			return ['<:Stone:849087811188686968>', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
		}

		const choices = ['<:Stone:849087811188686968>', '✂', '📰']
		const me = choices[Math.floor(Math.random() * choices.length)]
		msg.awaitReactions(filter, {
				max: 1,
				time: 60000,
				error: ["time"]
			}).then(
				async (collected) => {
					const reaction = collected.first()
					let result = new Discord.MessageEmbed()
						.setTitle("Resultado")
						.addField("Sua escolha", `${reaction.emoji.name}`)
						.addField("Escolha do bot", `${me}`)
					await msg.edit(result)

					if ((me === "<:Stone:849087811188686968>" && reaction.emoji.name === "✂") ||
						(me === "✂" && reaction.emoji.name === "📰") ||
						(me === "📰" && reaction.emoji.name === "<:Stone:849087811188686968>🗻")) {
						message.reply("Você perdeu!");
					} else if (me === reaction.emoji.name) {
						return message.reply("É um empate!");
					} else {
						return message.reply("Você ganhou!");
					}
				})
			.catch(collected => {
				message.reply('> ⛔ | O processo foi cancelado, você não respondeu a tempo.');
			})

	}
}