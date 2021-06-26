var steam = require('steam-provider') 
var provider = new steam.SteamProvider();

module.exports = {
    name: "steam",
    aliases: ['game', 'steamgame'],
    cooldown: 1000 * 2, 
    description: "Pesquise um jogo da steam.",
    category: "outros",
    usage: "<jogo>",

    async run (client, message, args) {
                        
        let arg = args.join(' ') 

        if(!arg) {
            const db = require("quick.db");
            const Discord = require("discord.js");

            let prefix = db.get(`prefix_${message.guild.id}`)
            if (prefix === null) { prefix = "s." }
  
            const help = new Discord.MessageEmbed()
            .setTitle("Comando da steam")
            .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
            .setDescription("Busque por informações do seu jogo favorito da steam!")
            .addField(`Forma de Utilização:`, ` \`${prefix}steam <game>\``)
            .addField(`Exemplo:`, ` \`${prefix}steam csgo\``)
            .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp();
            return message.channel.send(help);

        }

        provider.search(arg).then(result => { 
            provider.detail(result[0].id, 1, "portuguese", "pt").then(results => { 
                let other = results.otherData 
                const embed = new Discord.MessageEmbed() 
                    .setTitle(results.name)
                    .setColor('RANDOM')
                    .setDescription(`\n
                    <:spr4yxyz:837798446584168468> **Gênero:** \`${results.genres.join(', ')} \`
                    <:spr4yxyz:837798446584168468> **Plataforma:** \`${other.platforms.join(', ')}\`
                    <:spr4yxyz:837798446584168468> **Características:** \`${other.features.join(', ')}\`
                    <:spr4yxyz:837798446584168468> **Desenvolvedor:** \`${other.developer.join(', ')}\``)
                    .setThumbnail(other.imageUrl)
                    .setFooter(message.author.tag, message.author.displayAvatarURL(),message.author.displayAvatarURL)
                return message.channel.send(embed)
        })
    })
}
}