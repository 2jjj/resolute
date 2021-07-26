const db = require("quick.db");
const { MessageEmbed } = require('discord.js')
const GuildSettings = require("../../database/mongoDB/settings");

module.exports = {
    name: "setlogs",
    aliases: ['setmodlogs', "logs"],
    cooldown: 1000 * 2,
    description: "Ativar as logs no servidor.",
    category: "config",
    usage: "",
    example: "",
    permissoes: ["MANAGE_GUILD", "Gerenciar Servidor"],
    args: false,

	async run(client, message, args) {

        let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        let author = message.author;
        let err = "Mencione um canal!";
        let msg_confirmado = "Canal setado";

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
        if(!storedSettings.prefix){
			storedSettings.prefix = "s."
		}

        if (args[0] === "edit") {
            if (!message.member.hasPermission(module.exports.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Você não possui a permissão necessária para usar este comando, você precisa da permissão de \`${module.exports.permissoes[1]}\`!`)
            if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Eu não tenho a permissão necessária para executar este comando, eu preciso da permissão de \`${module.exports.permissoes[1]}\`!`)
            if (!canal) return message.channel.send(`<:x_:856894534071746600> | ${author} ${err}.`);
            
            db.set(`msg_edit_${message.guild.id}`, canal.id);
            db.set(`edit_config_${message.guild.id}`, true)

            message.channel.send(`<:v_:856894534184468480> **|** ${author} O canal ${canal} foi configurado com sucesso.`)
        }

        if (args[0] === "delete") {
            if (!message.member.hasPermission(module.exports.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Você não possui a permissão necessária para usar este comando, você precisa da permissão de \`${module.exports.permissoes[1]}\`!`)
            if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Eu não tenho a permissão necessária para executar este comando, eu preciso da permissão de \`${module.exports.permissoes[1]}\`!`)
            if (!canal) return message.channel.send(`<:x_:856894534071746600> **|** ${author} ${err}.`);

            db.set(`msg_del_${message.guild.id}`, canal.id);
            db.set(`delete_config_${message.guild.id}`, true)
            message.channel.send(`<:v_:856894534184468480> **|** ${author} O canal ${canal} foi configurado com sucesso.`)
        }

        if (args[0] === "mod") {
            if (!message.member.hasPermission(module.exports.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Você não possui a permissão necessária para usar este comando, você precisa da permissão de \`${module.exports.permissoes[1]}\`!`)
            if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return message.reply(`<:x_:856894534071746600> **|** Eu não tenho a permissão necessária para executar este comando, eu preciso da permissão de \`${module.exports.permissoes[1]}\`!`)
            let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if (!canal) return message.channel.send(`<:x_:856894534071746600> **|** ${author} ${msg_error_canal}`);

            db.set(`mod_logs_${message.guild.id}`, canal.id);
            db.set(`modlogs_config_${message.guild.id}`, true)
            let mod_logs0 = db.get(`mod_logs_${message.guild.id}`, canal.id);
            message.channel.send(`<:v_:856894534184468480> **|** ${author} ${msg_confirmado} para <#${mod_logs0}> com sucesso.`)
        }

        if (!args[0]) {
            let embed = new MessageEmbed()
                .setTitle(`Menu de ajuda - \`setlogs\``)
                .setColor("RANDOM")
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
                .setDescription(`${module.exports.description}`)
                .addField(`:bulb: Modos de Uso:`, ` \`${storedSettings.prefix}setlogs edit <#canal>\n${storedSettings.prefix}setlogs delete <#canal>\n${storedSettings.prefix}setlogs mod <#canal>\n\n${storedSettings.prefix}logsoff <mod/delete/edit> <#canal>\``)
                .addField(`:thinking: Exemplo:`, ` \`${storedSettings.prefix}setlogs edit #logs\n${storedSettings.prefix}setlogs delete #logs\n${storedSettings.prefix}setlogs mod #logs\n\n${storedSettings.prefix}logsoff delete #logs\n${storedSettings.prefix}logsoff edit #logs\n${storedSettings.prefix}logsoff mod #logs\``)
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