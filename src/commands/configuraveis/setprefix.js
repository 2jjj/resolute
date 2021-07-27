const Discord = require("discord.js")
const db = require("quick.db")
require("../../util/inlineReply")

module.exports = {
    name: "setprefix",
    aliases: ['prefix'],
    cooldown: 1000 * 2,
    description: "Já tem um outro bot com este prefixo? sem problemas com este comando você altera meu prefixo!",
    category: "config",
    usage: "<prefixo>",
    example: "!",
    permissoes: ["MANAGE_GUILD", "Gerenciar Servidor"],
    args: false,

    async run(client, message, args) {

        if (!message.member.hasPermission(module.exports.permissoes[0])) return;
        //if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;

        let alterado = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Como posso alterar o prefixo?")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .addField(`A configuração do prefixo é realizado pelo website do Resolute:`, `https://painel.resolutebot.xyz/dashboard/${message.guild.id}`)
            .setFooter("Resolute", message.author.displayAvatarURL())
            .setTimestamp();
        return message.inlineReply(alterado)
    }
}