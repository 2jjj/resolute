const jimp = require("jimp")
const Discord = require('discord.js')
const cooldowns = {}
const ms = require("ms")
const db = require("quick.db");

module.exports = {
    name: "laranjo",
    aliases: ["laranjomeme"],
    cooldown: 1000 * 2, 
    description: "dev",
    category: "manipulacao",
  
    async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

if(!cooldowns[message.author.id]) cooldowns[message.author.id] = {
        lastCmd: null
      }
let ultimoCmd = cooldowns[message.author.id].lastCmd 
     let timeout = 15000
    if (ultimoCmd !== null && timeout- (Date.now() - ultimoCmd) > 0) {
let time = ms(timeout - (Date.now() - ultimoCmd)); 
let resta = [time.seconds, 'segundos']
 
if(resta[0] == 0) resta = ['alguns', 'millisegundos']
if(resta[0] == 1) resta = [time.seconds, 'segundo']
message.reply(`**Espere **\`${time}\`** para executar outro comando**`)
       return;
    } else {
cooldowns[message.author.id].lastCmd = Date.now() 
    }

        let img = jimp.read("https://cdn.discordapp.com/attachments/554048737648050179/610011657632219147/laranjo-meme-cke.jpg")
        if (!args[0]) return message.quote("Escreva algo para o laranjo falar.")
        img.then(image => {
            jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(font => {
                image.resize(685, 494)
                image.print(font, 20, 30, args.join(" "), 600)
                image.getBuffer(jimp.MIME_PNG, (err, i) => {
                    message.reply({files: [{ attachment: i, name: "laranjo.png"}]})
                })
            })
        })
    }
}