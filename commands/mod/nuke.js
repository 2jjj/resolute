module.exports = {
	name: "nuke",
	aliases: [],
	cooldown: 1000 * 2,
	description: "Apagar o canal de texto em que você usou o coamando e depois eu criarei um identico.",
	category: "mod",
	usage: "",
	example: "",

	async run(client, message, args) {

		let filter = (m) => m.author.id === message.author.id
		message.channel.send(
			'<:1598blurplesupport:856520144599777291> **|** Você tem certeza? | Responda com s/n '
		)
		message.channel
			.awaitMessages(filter, {
				max: 1,
				time: 20000,
				errors: ['time'],
			})
			.then((message) => {
				message = message.first()
				if (
					message.content.toLowerCase() == 'Sim' ||
					message.content.toLowerCase() == 's'
				) {
					let channel = client.channels.cache.get(message.channel.id)
					let posisi = channel.position
					channel.clone().then((channel2) => {
						channel2.setPosition(posisi)
						channel.delete()
						channel2.send(
							' **O canal foi nukado com sucesso!** | https://i.pinimg.com/originals/06/c3/92/06c392b847166a9a671bfcd590d8fff7.gif'
						)
					})
				} else if (
					message.content.toLowerCase() == 'Não' ||
					message.content.toLowerCase() == 'n'
				) {
					return message.channel.send('Comando de nuke cancelado!')
				} else {
					return message.channel.send(`Resposta inválida.`)
				}
			})
	}
}