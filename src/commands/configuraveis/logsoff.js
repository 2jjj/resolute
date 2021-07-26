const db = require("quick.db");
const { MessageEmbed } = require('discord.js')
const GuildSettings = require("../../database/mongoDB/settings");

module.exports = {
    name: "setlogsoff",
    aliases: ['logsoff', 'desligarlogs'],
    cooldown: 1000 * 2,
    description: "Desligar as logs do servidor.",
    category: "config",
    usage: "<mod/delete/edit> <#canal>",
    example: "",
    permissoes: ["MANAGE_GUILD", "Gerenciar Servidor"],
    args: false,

	async run(client, message, args) {

		var storedSettings = await GuildSettings.findOne({
			gid: message.guild.id
		});
		if (!storedSettings) {
			const newSettings = new GuildSettings({
				gid: message.guild.id
			});
			await newSettings.save().catch(() => {});
			storedSettings = await GuildSettings.findOne({
				gid: message.guild.id
			});
		}

        if (args[0] === "edit") {
            if (!message.member.hasPermission(module.exports.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Você não possui a permissão necessária para usar este comando, você precisa da permissão de \`${module.exports.permissoes[1]}\`!`)
            if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Eu não tenho a permissão necessária para executar este comando, eu preciso da permissão de \`${module.exports.permissoes[1]}\`!`)
            let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

            db.delete(`msg_edit_${message.guild.id}`, canal.id)
            db.delete(`edit_config_${message.guild.id}`, true)
            const del_edit = new MessageEmbed()
                .setDescription("<:v_:856894534184468480> **|** O log de mensagens editadas foi desativado com sucesso neste servidor!")
                .setColor("RANDOM")
            message.channel.send(del_edit)
        }

        if (args[0] === "delete") {
            if (!message.member.hasPermission(module.exports.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Você não possui a permissão necessária para usar este comando, você precisa da permissão de \`${module.exports.permissoes[1]}\`!`)
            if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Eu não tenho a permissão necessária para executar este comando, eu preciso da permissão de \`${module.exports.permissoes[1]}\`!`)
            let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

            db.delete(`msg_del_${message.guild.id}`, canal.id)
            db.delete(`delete_config_${message.guild.id}`, true)

            const del_delete = new MessageEmbed()
                .setDescription("<:v_:856894534184468480> **|** O log de mensagens deletadas foi desativado com sucesso neste servidor!")
                .setColor("RANDOM")
            message.channel.send(del_delete)
        }

        if (args[0] === "mod") {
            if (!message.member.hasPermission(module.exports.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Você não possui a permissão necessária para usar este comando, você precisa da permissão de \`${module.exports.permissoes[1]}\`!`)
            if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Eu não tenho a permissão necessária para executar este comando, eu preciso da permissão de \`${module.exports.permissoes[1]}\`!`)
            let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

            db.delete(`mod_logs_${message.guild.id}`, canal.id)
            db.delete(`modlogs_config_${message.guild.id}`, canal.id)
            const del_mod = new MessageEmbed()
                .setDescription("<:v_:856894534184468480> **|** O modlogs foi desativado com sucesso neste servidor!")
                .setColor("RANDOM")
            message.channel.send(del_mod)
        }

        if (!args[0]) {
            let embed = new MessageEmbed()
                .setTitle(`Menu de ajuda - \`logsoff\``)
                .setColor("RANDOM")
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
                .setDescription(`${module.exports.description}`)
                .addField(`:bulb: Modos de Uso:`, ` \`${storedSettings.prefix}logsoff <mod/delete/edit> <#canal>\``)
                .addField(`:thinking: Exemplo:`, ` \`${storedSettings.prefix}logsoff edit #logs\n${storedSettings.prefix}logsoff delete #logs\n${storedSettings.prefix}logsoff mod #logs\``)
                .addField(`🔹 Aliases:`, ` \`${module.exports.aliases.length !== 0 ? `${module.exports.aliases}` : `Sem sinonimos para este comando.` }\``)
                .addField(`🔹 Permissões necessárias:`, ` \`${module.exports.permissoes[0, 1] !== undefined ? `${module.exports.permissoes[1]}` : `Não é necessário nenhuma permissão!` }\``)
                .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setTimestamp();
            message.channel.send(embed)
        }
    }
}