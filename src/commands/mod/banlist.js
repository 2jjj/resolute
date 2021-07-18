module.exports = {
	name: "banlist",
	aliases: ['listabans'],
	cooldown: 1000 * 2,
	description: "Veja a lista de membros banidos em seu servidor!",
	category: "mod",
	usage: "",
	example: "",
	permissoes: ["BAN_MEMBERS", "Banir Membros"],
	args: false,

	async run(client, message, args) {

		if (!message.member.hasPermission(module.exports.permissoes[0])) return;
		if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;
		
		const bans = await message.guild.fetchBans();

		if (!bans.first()) return message.channel.send('<:x_:856894534071746600> **|** Este servidor não possui membros banidos!');

		let msg = '';

		bans.map(user => {
			msg += `\`${user.user.tag}\`, `;
		});

		message.channel.send('<:mod:856894534088523776> **|** Lista de membros banidos:\n' + msg, {
			split: true
		});
	}
}