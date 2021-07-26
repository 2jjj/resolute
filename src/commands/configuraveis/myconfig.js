const { MessageEmbed } = require('discord.js')
const db = require("quick.db");
const GuildSettings = require("../../database/mongoDB/settings");

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

        let embed = new MessageEmbed()
            .setTitle(`Sistema de configuração - Resolute`)
            .setColor("RANDOM")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .setDescription(`Olá ${message.author} este é o meu painel de configuração!`)
            .addField(`**Logs do servidor:**`, `\`ModLogs\` **->** ${modlogs == null ? `<:offfzz:868635422086013018> Desabilitado | ${storedSettings.prefix}logs mod <#canal>` : `<:onnnzz:868635422153121822> Habilitado | ${storedSettings.prefix}logsoff mod <#canal>`}\n\`DeleteLogs\` **->** ${delete_logs == null ? `<:offfzz:868635422086013018> Desabilitado | ${storedSettings.prefix}logs delete <#canal>` : `<:onnnzz:868635422153121822> Habilitado | ${storedSettings.prefix}logsoff delete <#canal>` }\n\`EditLogs\` **->** ${edit_logs == null ? `<:offfzz:868635422086013018> Desabilitado | ${storedSettings.prefix}logs edit <#canal>` : `<:onnnzz:868635422153121822> Habilitado | ${storedSettings.prefix}logsoff edit <#canal>`}`)
            .addField(`**Autorole:**`, `${autorole == null ? `<:OFF:866476228440621057> Desabilitado | ${storedSettings.prefix}autorole <@cargo>` : `<:ON:866476228469719090> Habilitado | ${storedSettings.prefix}autoroleoff <@cargo>` }`)
            .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();
        message.channel.send(embed)
    }
}