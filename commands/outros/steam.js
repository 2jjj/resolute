const Discord = require('discord.js');
var steam = require('steam-provider') 
const db = require("quick.db");

var provider = new steam.SteamProvider();

module.exports = {
    name: "steam",
    aliases: ['game', 'steamgame'],
    cooldown: 1000 * 2, 
    description: "Pesquise um jogo da steam.",
    category: "outros",
    usage: "s.steam <jogo>",

    async run (client, message, args) {
        
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) { prefix = "s." }
        
let arg = args.join(' ') 
if(!arg) return message.channel.send(`> ${message.author}, Você precisa falar um jogo para eu pesquisar.`) 
provider.search(arg).then(result => { 
    provider.detail(result[0].id, 1, "portuguese", "pt").then(results => { 
        let other = results.otherData 
        const embed = new Discord.MessageEmbed() 
                    .setTitle(results.name)
                    .setColor('RANDOM')
                    .setDescription(`\n\n<:spr4yxyz:837798446584168468> Gênero: ${results.genres.join(', ')} \n<:spr4yxyz:837798446584168468> Plataforma: ${other.platforms.join(', ')}\n<:spr4yxyz:837798446584168468> Características: ${other.features.join(', ')}\n\n<:spr4yxyz:837798446584168468> Desenvolvedor: ${other.developer.join(', ')}`)
                    .setThumbnail(other.imageUrl)
                    .setFooter(message.author.tag, message.author.displayAvatarURL(),message.author.displayAvatarURL)
        return message.channel.send(embed)
    })
})
}
}