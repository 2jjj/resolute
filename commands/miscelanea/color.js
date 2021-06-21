const Discord = require('discord.js')
const fetch = require("node-fetch")

module.exports = {
    name: "color",
    aliases: ['docs'],
    cooldown: 1000 * 2, 
    description: "Color HEX",
    category: "outros",
    usage: "",

async run (client, message, args) {
        let color = args[0]
        if (color.includes("#")) {
            color = args[0].split("#")[1]
        }
        const url = (`https://api.alexflipnote.dev/colour/${color}`)
        let json
            try{
                json = await fetch(url).then(res => res.json())
            }
            catch(e) {
                return message.reply('Erro.')
            }
        if (json.description) return message.reply("Cor inválida.")
        let embed = new Discord.MessageEmbed()
        .setTitle(json.name)
        .addField("RGB", json.rgb, true)
        .addField("Brightness", json.brightness, true)
        .addField("Hex", json.hex, true)
        .setThumbnail(json.image)
        .setImage(json.image_gradient, true)
        .setColor(json.hex)
        message.channel.send(embed)
    }
}