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
    args: true,

    async run(client, message, args, msg) {

        if (!args[0]) return;
		if (!message.member.hasPermission(module.exports.permissoes[0])) return;
		if (!message.guild.me.hasPermission(module.exports.permissoes[0])) return;
        
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "s."

        if (args[0] === prefix) {
            let atual = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('Este já é meu prefixo atual.')
            return message.inlineReply(atual)
        }

        if (args[1]) {
            let space = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('O prefixo não pode ter espaços.')
            return message.inlineReply(space)
        }

        if (args[0].length > 3) {
            let caracter = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle('O prefixo não pode ter mais de 3 caracteres.')
            return message.inlineReply(caracter)
        }

        db.set(`prefix_${message.guild.id}`, args[0])
        let alterado = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Prefixo alterado!")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .addField(`Autor:`, `ﾠ<:setaaa:860626769089265665> ${message.author} | \`${message.author.id}\``)
            .addField(`Novo Prefixo:`, `ﾠ<:setaaa:860626769089265665> \`${args[0]}\``)
            .setFooter("Resolute", message.author.displayAvatarURL())
            .setTimestamp();
        return message.inlineReply(alterado)
    }
}