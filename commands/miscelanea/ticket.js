const db = require("quick.db")

module.exports = {
	name: "ticket",
	aliases: ['mail'],
	cooldown: 1000 * 2,
	description: "Abra um ticket em um canal com seu ID.",
	category: "outros",
	usage: "",
	example: "",
	args: false,
	
	async run(client, message, args) {

        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "s."

		message.delete()
		const spray = message.guild.channels.cache.find(ch => ch.name === `${message.author.id}`);
		if (spray) return message.channel.send(`<:1926blurplecross:856520144872407060> **|** ${message.author} Seu ticket atual já está aberto em: ${spray}!`).then(msg => msg.delete({
			timeout: 15000
		}));

		message.guild.channels.create(`${message.author.id}`, {
			type: 'text',
			permissionOverwrites: [{
					id: message.guild.id,
					deny: ['VIEW_CHANNEL']
				},
				{
					id: message.author.id,
					allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
				}
			]
		}).then(async channel => {
			message.channel.send(`🎫 | ${message.author} Seu ticket foi criado com sucesso: ${channel}`).then(msg => msg.delete({
				timeout: 15000
			}));
			channel.send(`<:v_:856894534184468480> **|** Olá ${message.author}, este é o seu ticket!\n<:x_:856894534071746600> **|** Caso queira fechar seu ticket, utilize **${prefix}close**.`)
		})
	}
}