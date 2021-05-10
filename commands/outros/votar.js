const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    var content = args.join(' ')

    if (content.length > 600) { return message.inlineReply('<:bravinha:841126251741970452> O conteúdo a ser votado não pode passar de **600 caracteres.**') }

    var embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle(`<:pikachu:841126012015476767> Votação aberta por ${message.author.username}`)
        .setDescription(content)

    if (!content) { return message.inlineReply('`' + prefix + 'votar o que você quer que seja votado.`') }

    if (content) {
        return message.channel.send(embed).then(msg => {
            msg.react('👍').catch(err => { return })
            msg.react('👎').catch(err => { return })
        })
    }
}

exports.help = {
    name: "votar",
    aliases: ["votar"]
  }