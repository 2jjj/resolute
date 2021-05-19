const Discord = require('discord.js');
const db = require('quick.db');


exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    var content = args.join(' ')

    if (content.length > 600) { return message.inlineReply('<:Information:844591555225714688> O conteúdo a ser votado não pode passar de **600 caracteres.**') }

    var embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`<:Time:844591047719125012> Votação aberta por ${message.author.username}`)
        .setDescription(content)

    if (!content) { return message.inlineReply('`' + prefix + 'votar o que você quer que seja votado.`') }

    if (content) {
        return message.channel.send(embed).then(msg => {
            msg.react('👍').catch(err => { return })
            msg.react('👎').catch(err => { return })
        })
    }
}
