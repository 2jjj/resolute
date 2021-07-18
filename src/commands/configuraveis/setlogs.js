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


    run: async (client, message, args) => {

        let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        let author = message.author;
        let err = "Mencione um canal!";
        let msg_confirmado = "Canal setado";
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "s."

        if (args[0] === "edit") {
            if (!message.member.hasPermission(module.exports.permissoes)) return;
            if (!message.guild.me.hasPermission(module.exports.permissoes)) return;
            if (!canal) return message.channel.send(`:x: | ${author} ${err}.`);
            db.set(`msg_edit_${message.guild.id}`, canal.id);
            let confirm_pt1 = "O canal";
            let confirm_pt2 = "foi configurado com sucesso.";
            message.channel.send(`✅ ${author} ${confirm_pt1} ${canal} ${confirm_pt2}`)
        }

        if (args[0] === "delete") {

            if (!message.member.hasPermission(module.exports.permissoes)) return;
            if (!message.guild.me.hasPermission(module.exports.permissoes)) return;
            if (!canal) return message.channel.send(`:x: | ${author} ${err}.`);

            db.set(`msg_del_${message.guild.id}`, canal.id);

            let confirm_pt1 = "O canal";
            let confirm_pt2 = "foi configurado com sucesso.";
            message.channel.send(`✅ ${author} ${confirm_pt1} ${canal} ${confirm_pt2}`)
        }

        if (args[0] === "mod") {
            if (!message.member.hasPermission(module.exports.permissoes)) return;
            if (!message.guild.me.hasPermission(module.exports.permissoes)) return;
            let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if (!canal) return message.channel.send(`:x: | ${author} ${msg_error_canal}`);
            db.set(`mod_logs_${message.guild.id}`, canal.id);
            let mod_logs0 = db.get(`mod_logs_${message.guild.id}`, canal.id);
            message.channel.send(`✅ | ${author} ${msg_confirmado} para <#${mod_logs0}> com sucesso.`)
        }

        if (args[0] === "off" || args[1] == "edit") {
            let canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            db.delete(`msg_edit_${message.guild.id}`, canal.id)
            const del = new MessageEmbed()
                .setTitle(`Modlog desligado com sucesso`)
                .setDescription("🚫 **O Channel mod log foi desativado nesse Servidor!**")
                .setColor("RANDOM")
            message.channel.send(del)
        }

        if (!args[0]) {
            let embed = new MessageEmbed()
                .setTitle(`Menu de ajuda - \`setlogs\``)
                .setColor("RANDOM")
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
                .setDescription(`${module.exports.description}`)
                .addField(`:bulb: Modos de Uso:`, ` \`${prefix}setlogs edit <#canal>\n${prefix}setlogs delete <#canal>\`${prefix}setlogs mod <#canal>\``)
                .addField(`:thinking: Exemplo:`, ` \`${prefix}setlogs edit #logs\n${prefix}setlogs delete #logs\`${prefix}setlogs mod #logs\``)
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