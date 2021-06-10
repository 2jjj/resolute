const Discord = require('discord.js')
var Jimp = require("jimp")

module.exports = {
    name: "primeiraspalavras",
    aliases: ["firstwords"],
    cooldown: 1000 * 2, 
    description: "Faça o bebe falar as primeiras palavras!",
    category: "manipulacao",
    usage: "<texto>",

    async run (client, message, args) {

    if (message.content.split(' ').slice(1).join(' ').length < 1) {
        message.reply('<:info:835206734225473546> | Você não escreveu nada.')
    } else {
        if (message.content.split(' ').slice(1).join(' ').length > 50) {
            message.reply('<:info:835206734225473546> | Você ultrapassou o limite de 50 caracteres.')
        } else {
            if (message.member.hasPermission('ATTACH_FILES')) {
                var authorMessage = message
                message.reply('Aguarde...').then  (message => {
                    Jimp.read(`https://cdn.discordapp.com/attachments/538711394137407488/567123894956457984/tirinha_baby.png`, function (err, image) {
                        if (err) message.reply('ocorreu um erro ao criar a imagem.')
                        Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (font) {
                            image.print(font, 11, 13, authorMessage.content.split(' ').slice(1).join(' ')[0] + '... ' + authorMessage.content.split(' ').slice(1).join(' ')[0] + '...', 400)
                            image.print(font, 19, 290, authorMessage.content.split(' ').slice(1).join(' '), 320)
                            var aguardeMessage = message
                            image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                                const attachment = new Discord.MessageAttachment(buffer, 'primeiraspalavras.png')
                                message.reply(attachment).then(message => {
                                    aguardeMessage.delete()
                                })
                            })
                        })
                    })
                })
            } else {
                message.reply('<:info:835206734225473546> | Eu não tenho a permissão necessária para fazer isso. `ATTACH_FILES`')
            }
        }
    }
}}