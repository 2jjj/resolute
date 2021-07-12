module.exports = {
	name: "clear",
	aliases: ['limpar'],
	cooldown: 1000 * 2,
	description: "Limpar uma determinada quantidade de mensagens no chat.",
	category: "mod",
	usage: "<0/99>",
	example: "99",

	async run(client, message, args) {

		if (!args[0]) return;

		let user = message.author.username

		if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("<:x_:856894534071746600> **|** Você não possui a permissão necessária para usar este comando, você precisa da permissão de `Gerenciar mensagens`")

		const deleteCount = parseInt(args[0], 10);

		const fetched = await message.channel.messages.fetch({
			limit: deleteCount + 1
		});

		message.channel.bulkDelete(fetched); {
			await message.channel.send(`<:v_:856894534184468480> **|** O chat teve ${deleteCount} mensagens deletadas por ${message.author}!`);
		}
	}
};