const Discord = require("discord.js");

module.exports = {
	name: "userinfo",
	aliases: ['ui'],
	cooldown: 1000 * 2,
	description: "Obtenha informações de um usuário.",
	category: "outros",
	usage: "<id/@user>",
	example: "@Spray#7725",
	args: false,
	
	async run(client, message, args) {

		let inline = true
		let resence = true
		const status = {
			online: "✅ Online",
			idle: "🌙 Ausente",
			dnd: "❌ Não perturbar",
			offline: "👾 Invisivel"
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		let target = message.mentions.users.first() || message.author

		if (member.user.bot === true) {
			bot = "✅ Sim";
		} else {
			bot = "❌ Não";
		}

		let embed = new Discord.MessageEmbed()
			//.setAuthor(member.user.username)
			.setThumbnail((target.displayAvatarURL))
			.setColor("#RANDOM")
			.setDescription(`
			<:user_StarLab:855629091344744448> **| User:** \`${member.user.tag}\`

			<:information:843542771814236170> **| ID:** \`${member.user.id}\`

			<:ybs_usuarios:851954718724980757> **| Apelido:** \`${member.nickname !== null ? `✅ Apelido: ${member.nickname}` : "❌ Sem Apelidos"}\`

			<:ybs_bot:851955104345227294> **| Bot? ->** \`${bot}\`

			<:info:856340439203053812> **| Status:** \`${status[member.user.presence.status]}\`
			
			<:ybs_status:851954702840627200> **| Cargos:** ${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "❌ Sem cargos"}

			<:ybs_lupa:851954489988743198> **| Dia em que entrou no discord:** \`${member.user.createdAt}\`
        `)
			.setFooter(`Informação sobre ${member.user.username}`)
			.setTimestamp()
		message.channel.send(embed);
	}
}