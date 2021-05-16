const jimp = require("jimp")
const Discord = require('discord.js')
const cooldowns = {}
const ms = require("ms")
const db = require("quick.db")

exports.run = async (client, message, args) => {
    
let prefix = db.get(`prefix_${message.guild.id}`)
if (prefix === null) prefix = "s."

        let img = jimp.read("https://pbs.twimg.com/media/DIP-webXgAA6iJQ.jpg")
        if (!args[0]) return message.reply("Escreva algo para o cachorro")
        img.then(image => {
            jimp.loadFont(jimp.FONT_SANS_32_WHITE).then(font => {
                image.resize(685, 494)
                image.print(font, 20, 30, args.join(" "), 600)
                image.getBuffer(jimp.MIME_PNG, (err, i) => {
                    message.channel.send({files: [{ attachment: i, name: "cachorro.png"}]})
                })
            })
        })
    }
