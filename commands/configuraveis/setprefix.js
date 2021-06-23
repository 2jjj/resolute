const Discord = require("discord.js")
const db = require("quick.db")
require("../../util/inlineReply")

module.exports = {
    name: "setprefix",
    aliases: ["prefix"],
    cooldown: 1000 * 2, 
    description: "Comando de setar o prefixo do bot.",
    category: "config",
    usage: "<novo_prefixo>",

    async run (client, message, args, msg) {

    if (!message.member.hasPermission('ADMINISTRATOR')) {
        let permss = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Permissão Necessária: ADMINISTRADOR')
        return message.inlineReply(permss)
    }

    if (!args[0]) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "s."

        let format = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Siga o formato correto')
            .setDescription('`' + prefix + 'setprefix <prefixo_novo>`\n \nExemplo: `' + prefix + 'setprefix !`')
        return message.inlineReply(format)
    }

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."
    if (args[0] === prefix) {
        let atual = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Este já é meu prefixo atual.')
        return message.inlineReply(atual)
    }

    if (args[1]) {
        let space = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('O prefixo não pode ter espaços.')
        return message.inlineReply(space)
    }

    if (args[0].length > 3) {
        let caracter = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('O prefixo não pode ter mais de 3 caracteres.')
        return message.inlineReply(caracter)
    }

                db.set(`prefix_${message.guild.id}`, args[0])
                let alterado = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`${message.author}` + ' alterou meu prefixo para: `' + args[0] + '`')
                return message.inlineReply(alterado)
}}