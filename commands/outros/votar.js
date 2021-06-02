const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "votar",
    aliases: ['votacao', 'vote'],
    cooldown: 1000 * 2, 
    description: "Votação",
    category: "outros",

    async run (client, message, args) {
        
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) { prefix = "s." }

    var content = args.join(' ')

    if (content.length > 600) { return message.inlineReply('<:Resoluteinfo:844971535927083088> O conteúdo a ser votado não pode passar de **600 caracteres.**') }

    var embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`<:Time:844591047719125012> Votação aberta por ${message.author.username}`)
        .setDescription(content)

    if (!content) { return message.inlineReply(`<:1icon_x:846184439403118624> | **Maneira correta <:spr4yxyz:837798446584168468> ${prefix}votar <conteudo da votação>**`) }

    if (content) {
        return message.channel.send(embed).then(msg => {
            msg.react(`<a:sim:845773734862258197>`).catch(err => { return })
            msg.react(`<a:nao:845773685330804756>`).catch(err => { return })
        })
    }
}
}