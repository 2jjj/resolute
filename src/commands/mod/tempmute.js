const ms = require('ms')

module.exports = {
	name: "tempmute",
	aliases: [],
	cooldown: 1000 * 2,
	description: "Silenciar alguém temporariamente.",
	category: "mod",
	usage: "@user <tempo>",
	example: "@Spray#0007 4000",
	permissoes: ["MANAGE_MESSAGES", "Gerenciar Mensagens"],
	args: true,

	async run(client, message, args) {

		if(!args[0]) return;
		if (!message.member.hasPermission(module.exports.permissoes[0])) return;
		if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;
			
		const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
		const time = args[1]

		if (!time) return message.channel.send('<:x_:856894534071746600> **|** Por favor especifique o tempo.')
		const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
		if (!role) {
			try {
				message.channel.send('O cargo de mute não está criado, irei criá-lo.')

				let muterole = await message.guild.roles.create({
					data: {
						name: 'muted',
						permissions: []
					}
				});
				message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
					await channel.createOverwrite(muterole, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false
					})
				});
				message.channel.send('<:v_:856894534184468480> **|** Cargo de mute foi criado com sucesso!')
			} catch (error) {
				console.log(error)
			}
		};
		let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
		if (Member.roles.cache.has(role2.id)) return message.channel.send(`O membro ${Member.displayName} já está silenciado!`)
		await Member.roles.add(role2)
		message.channel.send(`<:v_:856894534184468480> **|** ${Member.displayName} está silenciado.`)

		setTimeout(async () => {
			await Member.roles.remove(role2)
			message.channel.send(`<:v_:856894534184468480> **|** O membro ${Member.displayName} agora não está mais silenciado.`)
		}, ms(time))
	}
}