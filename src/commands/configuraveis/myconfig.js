const { MessageEmbed } = require('discord.js')
const db = require("quick.db");

module.exports = {
    name: "myconfig",
    aliases: ['config', "start"],
    cooldown: 1000 * 2,
    description: "",
    category: "config",
    usage: "",
    example: "",
    permissoes: ["MANAGE_GUILD", "Gerenciar Servidor"],
    args: false,

	async run(client, message, args) {

        let modlogs = db.get(`modlogs_config_${message.guild.id}`)
        let delete_logs = db.get(`delete_config_${message.guild.id}`)
        let edit_logs = db.get(`edit_config_${message.guild.id}`)
		let autorole = db.get(`autorole_config_${message.guild.id}`);

        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "s."

        let embed = new MessageEmbed()
            .setTitle(`Sistema de configuração - Resolute`)
            .setColor("RANDOM")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .setDescription(`Olá ${message.author} este é o meu painel de configuração!`)
            .addField(`**Logs do servidor:**`, `\`ModLogs\` **->** ${modlogs == null ? `<:OFF:866476228440621057> Desabilitado | ${prefix}logs mod <#canal>` : `<:ON:866476228469719090> Habilitado | ${prefix}logsoff mod <#canal>`}\n\`DeleteLogs\` **->** ${delete_logs == null ? `<:OFF:866476228440621057> Desabilitado | ${prefix}logs delete <#canal>` : `<:ON:866476228469719090> Habilitado | ${prefix}logsoff delete <#canal>` }\n\`EditLogs\` **->** ${edit_logs == null ? `<:OFF:866476228440621057> Desabilitado | ${prefix}logs edit <#canal>` : `<:ON:866476228469719090> Habilitado | ${prefix}logsoff edit <#canal>`}`)
            .addField(`**Autorole:**`, `${autorole == null ? `<:OFF:866476228440621057> Desabilitado | ${prefix}autorole <@cargo>` : `<:ON:866476228469719090> Habilitado | ${prefix}autoroleoff <@cargo>` }`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();
        message.channel.send(embed)
    }
}