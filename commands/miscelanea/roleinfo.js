const moment = require('moment');
const {
	MessageEmbed
} = require("discord.js")
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
	name: "roleinfo",
	aliases: ['ri'],
	cooldown: 1000 * 2,
	description: 'Informações de um cargo.',
	category: "outros",
	usage: "@cargo",

	async run(client, message, args) {

		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

		const permissions = {
			"ADMINISTRATOR": "Administrator",
			"VIEW_AUDIT_LOG": "View Audit Log",
			"VIEW_GUILD_INSIGHTS": "View Server Insights",
			"MANAGE_GUILD": "Manage Server",
			"MANAGE_ROLES": "Manage Roles",
			"MANAGE_CHANNELS": "Manage Channels",
			"KICK_MEMBERS": "Kick Members",
			"BAN_MEMBERS": "Ban Members",
			"CREATE_INSTANT_INVITE": "Create Invite",
			"CHANGE_NICKNAME": "Change Nickname",
			"MANAGE_NICKNAMES": "Manage Nicknames",
			"MANAGE_EMOJIS": "Manage Emojis",
			"MANAGE_WEBHOOKS": "Manage Webhooks",
			"VIEW_CHANNEL": "Read Text Channels & See Voice Channels",
			"SEND_MESSAGES": "Send Messages",
			"SEND_TTS_MESSAGES": "Send TTS Messages",
			"MANAGE_MESSAGES": "Manage Messages",
			"EMBED_LINKS": "Embed Links",
			"ATTACH_FILES": "Attach Files",
			"READ_MESSAGE_HISTORY": "Read Message History",
			"MENTION_EVERYONE": "Mention @everyone, @here, and All Roles",
			"USE_EXTERNAL_EMOJIS": "Use External Emojis",
			"ADD_REACTIONS": "Add Reactions",
			"CONNECT": "Connect",
			"SPEAK": "Speak",
			"STREAM": "Video",
			"MUTE_MEMBERS": "Mute Members",
			"DEAFEN_MEMBERS": "Deafen Members",
			"MOVE_MEMBERS": "Move Members",
			"USE_VAD": "Use Voice Activity",
			"PRIORITY_SPEAKER": "Priority Speaker"
		}

		const yesno = {
			true: '`Sim`',
			false: '`Não`'
		}

		if (!role) {
			let prefix = db.get(`prefix_${message.guild.id}`)
			if (prefix === null) prefix = "s."

			const help = new Discord.MessageEmbed()
				.setTitle("Comando de roleinfo")
				.setDescription("Consiga informações de um determinado cargo!")
				.addField(`Forma de Utilização:`, `<:pontin:852197383974551582> \`${prefix}roleinfo @cargo\``)
				.setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({
					dynamic: true
				}))
				.setColor("RANDOM")
				.setTimestamp();
			return message.channel.send(help);
		}

		const rolePermissions = role.permissions.toArray();
		const finalPermissions = [];
		for (const permission in permissions) {
			if (rolePermissions.includes(permission)) finalPermissions.push(`✔️ ${permissions[permission]}`);
			else finalPermissions.push(`❌ ${permissions[permission]}`);
		}

		const position = `\`${message.guild.roles.cache.size - role.position}\`/\`${message.guild.roles.cache.size}\``;

		const embed = new MessageEmbed()

			.setTitle(`Cargo: ${role}`)
			.setThumbnail(message.guild.iconURL({
				dynamic: true,
				size: 1024
			}))
			.addField('Nome', role, true)
			.addField('ID', `\`${role.id}\``, true)
			.addField('Posição', position, true)
			.addField('Mencionável?', yesno[role.mentionable], true)
			//.addField('Bot Role', yesno[role.managed], true)
			.addField('Visivel', yesno[role.hoist], true)
			.addField('Cor', `\`${role.hexColor.toUpperCase()}\``, true)
			.addField('Data de criação', `\`${moment(role.createdAt).format('DD/MMM/YYYY')}\``, true)
			.addField('Permissões', `\`\`\`diff\n${finalPermissions.join('\n')}\`\`\``)

		message.channel.send(embed)
	}
}