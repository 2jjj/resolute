const db = require("quick.db");
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "setlogs",
    aliases: ['setmodlogs', "logs"],
    cooldown: 1000 * 2,
    description: "",
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
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "s."

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

        if (args[0] === "off_edit") {
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

        if (args[0] === "off_delete") {
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

        if (args[0] === "off_mod") {
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
                .setTitle(`Menu de ajuda - \`setlogs\``)
                .setColor("RANDOM")
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
                .setDescription(`${module.exports.description}`)
                .addField(`:bulb: Modos de Uso:`, ` \`${prefix}setlogs edit <#canal>\n${prefix}setlogs delete <#canal>\n${prefix}setlogs mod <#canal>\n\n${prefix}setlogs off_<mod/delete/edit> <#canal>\``)
                .addField(`:thinking: Exemplo:`, ` \`${prefix}setlogs edit #logs\n${prefix}setlogs delete #logs\n${prefix}setlogs mod #logs\n\n${prefix}setlogs off_delete #logs\n${prefix}setlogs off_edit #logs\n${prefix}setlogs off_mod #logs\``)
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