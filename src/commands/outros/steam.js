const Discord = require('discord.js');
var steam = require('steam-provider') 
const db = require("quick.db");

var provider = new steam.SteamProvider();

exports.run = (bot, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."
 
let arg = args.join(' ') 
if(!arg) return message.channel.send(`<:y_pontinho:843648515695444019> ${message.author}, Você precisa colocar um jogo!`) 
provider.search(arg).then(result => { 
    provider.detail(result[0].id, 1, "portuguese", "pt").then(results => { 
        let other = results.otherData 
        const embed = new Discord.MessageEmbed() 
                    .setTitle(results.name)
                    .setColor('RANDOM')
                    .setDescription(`\n\n<:pxdro:844591434191732798> Gênero: ${results.genres.join(', ')} \n<:pxdro:844591434191732798> Plataforma: ${other.platforms.join(', ')}\n<:pxdro:844591434191732798> Características: ${other.features.join(', ')}\n\n<:pxdro:844591434191732798> Desenvolvedor: ${other.developer.join(', ')}`)
                    .setThumbnail(other.imageUrl)
                    .setFooter(message.author.tag, message.author.displayAvatarURL(),message.author.displayAvatarURL)
        return message.channel.send(embed)
    })
})
}
