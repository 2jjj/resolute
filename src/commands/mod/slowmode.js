const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
	name: "slowmode",
	aliases: ['slow'],
	cooldown: 1000 * 2,
	description: "Colocar modo lento no chat.",
	category: "mod",
	usage: "<tempo> [motivo]",
	example: "5000 tem gente spamando.",
	permissoes: "MANAGE_CHANNELS",
	args: true,

	async run(client, message, args) {

		if(!args[0]) return;
		if (!message.member.hasPermission(module.exports.permissoes)) return;
		if (!message.guild.me.hasPermission(module.exports.permissoes)) return;
		
		const currentCooldown = message.channel.rateLimitPerUser;
		const reason = args[1] ? args.slice(1).join(' ') : 'Sem motivos.';

		const embed = new MessageEmbed()
			.setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({
				dynamic: true
			}));

		if (args[0] === 'off') {

			if (currentCooldown === 0) return message.channel.send(`<:v_:856894534184468480> **|** O slowmode foi desativado com sucesso por ${message.author}`)

			embed.setTitle('Slowmode Desativado.')
				.setColor('#00ff00')
			return message.channel.setRateLimitPerUser(0, reason)

		}

		const time = ms(args[0]) / 1000;

		if (isNaN(time)) return message.channel.send('<:x_:856894534071746600> **|** O tempo que você colocou é inválido!').then(m => m.delete({
			timeout: 5000
		}));

		if (time >= 21600) return message.channel.send('<:x_:856894534071746600> **|** Esse limite de modo lento é muito alto, digite qualquer coisa menor que 6 horas.').then(m => m.delete({
			timeout: 5000
		}));

		if (currentCooldown === time) return message.channel.send(`O Slowmode já está definido para ${args[0]}`);

		embed.setTitle('Slowmode Ativado com sucesso!')
			.addField('Slowmode: ', args[0])
			.addField('Ativado por: ', message.author)
			.addField('Razão: ', reason)
			.setColor("RANDOM");
		message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed));

	}
}