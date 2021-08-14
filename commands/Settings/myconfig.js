const { MessageEmbed } = require('discord.js')
const db = require("quick.db");

module.exports = {
    name: "myconfig",
    aliases: ['config', "start"],
    cooldown: 1000 * 2,
    description: "Menu de configuração do bot.",
    category: "config",
    usage: "",
    example: "",
    permissoes: {
        membro: ['MANAGE_GUILD', 'Gerenciar Servidor'],
        bot: ['MANAGE_GUILD', 'Gerenciar Servidor']
    },
    args: false,

    async run(client, message, args, cmduser, text, prefix, player) {
        
		if (!message.member.hasPermission(module.exports.permissoes.membro[0])) return;
		if (!message.guild.me.hasPermission(module.exports.permissoes.bot[0])) return;

        let modlogs = db.get(`modlogs_config_${message.guild.id}`)
        let delete_logs = db.get(`delete_config_${message.guild.id}`)
        let edit_logs = db.get(`edit_config_${message.guild.id}`)
		let autorole = db.get(`autorole_config_${message.guild.id}`);

        let embed = new MessageEmbed()
            .setTitle(`Sistema de configuração - Resolute`)
            .setColor("RANDOM")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .setDescription(`Olá ${message.author} este é o meu painel de configuração!`)
            .addField(`**Logs do servidor:**`, `\`ModLogs\` **->** ${modlogs == null ? `<:offfzz:868635422086013018> Desabilitado | ${prefix}logs mod <#canal>` : `<:onnnzz:868635422153121822> Habilitado | ${prefix}logsoff mod <#canal>`}\n\`DeleteLogs\` **->** ${delete_logs == null ? `<:offfzz:868635422086013018> Desabilitado | ${prefix}logs delete <#canal>` : `<:onnnzz:868635422153121822> Habilitado | ${prefix}logsoff delete <#canal>` }\n\`EditLogs\` **->** ${edit_logs == null ? `<:offfzz:868635422086013018> Desabilitado | ${prefix}logs edit <#canal>` : `<:onnnzz:868635422153121822> Habilitado | ${prefix}logsoff edit <#canal>`}`)
            .addField(`**Autorole:**`, `${autorole == null ? `<:OFF:866476228440621057> Desabilitado | ${prefix}autorole <@cargo>` : `<:ON:866476228469719090> Habilitado | ${prefix}autoroleoff <@cargo>` }`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();
        message.channel.send(embed)
    }
}