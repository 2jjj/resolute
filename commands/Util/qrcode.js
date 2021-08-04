const Discord = require('discord.js');

module.exports = {
    name: "qrcode",
    aliases: [],
    cooldown: 1000 * 2,
    description: "Consiga um qrcode para seu link.",
    category: "util",
    usage: "<link>",
    example: "https://resolutebot.xyz",
    permissoes: [],
    args: true,

    async run(client, message, args) {

        if (!args[0]) return;

        let qrlink = `http://api.qrserver.com/v1/create-qr-code/?data=${args[0]}&size=200x200`
        
        if (require('is-url')(args[0])) {
            const attachment = new Discord.MessageAttachment(qrlink, 'qrcode.png');
            const embed = new Discord.MessageEmbed()
                .attachFiles(attachment)
                .setImage('attachment://qrcode.png')
                .setFooter(`Requisitado por ${message.author.username}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setTimestamp()

            message.inlineReply(embed)

        } else {
            message.channel.send("URL inválida.")
        }
    }
}