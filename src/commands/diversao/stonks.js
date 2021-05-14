const Discord = require('discord.js')
const db = require("quick.db");

exports.run = async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = "s."

        
        var list = [
                'https://imgur.com/jVL0mbR.gif',
                'https://cdn.dicionariopopular.com/imagens/image-347.jpg'
        ]

        var rand = list[Math.floor(Math.random() * list.length)]

        var embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setImage(rand)
        await message.inlineReply(embed)
}