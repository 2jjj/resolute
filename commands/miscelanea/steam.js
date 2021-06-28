var steam = require('steam-provider') 
var provider = new steam.SteamProvider();

module.exports = {
    name: "steam",
    aliases: ['game', 'steamgame'],
    cooldown: 1000 * 2, 
    description: "Busque por informações do seu jogo favorito da steam!",
    category: "outros",
    usage: "<jogo>",
    example: "s.steam csgo",

    async run (client, message, args) {            
        let arg = args.join(' ') 

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