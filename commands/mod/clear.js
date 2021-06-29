module.exports = {
	name: "clear",
	aliases: ['limpar'],
	cooldown: 1000 * 2,
	description: "Limpar uma determinada quantidade de mensagens",
	category: "mod",
	usage: "<0/99>",
	example: "clear 77",

	async run(client, message, args) {

		let user = message.author.username

		if (!message.member.permissions.has("MANAGE_MESSAGES"))
			return message.reply(
				"<:x_:856894534071746600> **|** Você não tem permissão para limpar mensagens, Permissão necessária: MANAGE_MESSAGES"
			);

		const deleteCount = parseInt(args[0], 10);

		const fetched = await message.channel.messages.fetch({
			limit: deleteCount + 1
		});
		message.channel.bulkDelete(fetched); {
			await message.channel.send(`<:v_:856894534184468480> **|** O chat teve ${deleteCount} mensagens deletadas por ${message.author}!`);
		}
	}
};