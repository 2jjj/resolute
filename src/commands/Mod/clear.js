module.exports = {
	name: "clear",
	aliases: ['limpar'],
	cooldown: 1000 * 2,
	description: "Limpar uma determinada quantidade de mensagens no chat.",
	category: "mod",
	usage: "<0/99>",
	example: "99",
	args: true,
	permissoes: {
        membro: ['MANAGE_MESSAGES', 'Gerenciar Mensagens'],
        bot: ['MANAGE_MESSAGES', 'Gerenciar Mensagens']
    },

	async run(client, message, args) {

		if (!args[0]) return;
		if (!message.member.hasPermission(module.exports.permissoes.membro[0])) return;
		if (!message.guild.me.hasPermission(module.exports.permissoes.bot[0])) return;

		let user = message.author.username

		const deleteCount = parseInt(args[0], 10);

		const fetched = await message.channel.messages.fetch({
			limit: deleteCount + 1
		});

		message.channel.bulkDelete(fetched); {
			await message.inlineReply(`<:v_:856894534184468480> **|** O chat teve ${deleteCount} mensagens deletadas por ${message.author}!`);
		}
	}
};