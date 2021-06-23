const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: "pisar",
  aliases: [],
  cooldown: 1000 * 2, 
  description: "Pise em alguém",
  category: "gifs",
  usage: "@user",

async run (client, message, args) {

  var list = [
    'https://imgur.com/McsRAGI.gif',
    'https://imgur.com/NhcfGAT.gif',
    'https://imgur.com/f6C1Mk7.gif',
    'https://imgur.com/nOVO5KC.gif',
    'https://imgur.com/E0zrKGs.gif',
    'https://imgur.com/lFTlLWk.gif',
    'https://imgur.com/7SNkffw.gif'
  ]

  var list1 = [
    'https://imgur.com/McsRAGI.gif',
    'https://imgur.com/NhcfGAT.gif',
    'https://imgur.com/f6C1Mk7.gif',
    'https://imgur.com/nOVO5KC.gif',
    'https://imgur.com/E0zrKGs.gif',
    'https://imgur.com/lFTlLWk.gif',
    'https://imgur.com/7SNkffw.gif'
  ]

  var rand = list[Math.floor(Math.random() * list.length)]
  var rand1 = list1[Math.floor(Math.random() * list1.length)]
  let user = message.mentions.users.first()

  if (!user) {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    const help = new Discord.MessageEmbed()
    .setTitle("Comando de pisar")
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
    .setDescription("Pise em alguém!!")
    .addField(`Forma de Utilização:`, ` \`${prefix}pisar @usuario\``)
    .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
    .setImage(rand)
    .setTimestamp();
    return message.channel.send(help);
  }

  if (user.id === message.author.id) {
    return message.inlineReply('Você não pode usar este comando com você mesmo.')
  }

  let avatar = message.author.displayAvatarURL({ format: 'png' })
  let avatar1 = user.displayAvatarURL({ format: 'png' })
  var embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription(`${message.author} está pisando em você ${user}`, avatar)
    .setImage(rand)
    .setFooter('Clique em 🔁 para retribuir')

  var embed2 = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription(`${user} devolveu as pisadas ${message.author} `, avatar1)
    .setImage(rand1)

  await message.inlineReply(embed).then(msg => {
    msg.react('🔁')
    msg.awaitReactions((reaction, user) => {
      if (message.mentions.users.first().id !== user.id) return

      if (reaction.emoji.name === '🔁') {
        return message.inlineReply(embed2)
      }
    })
  })
}
}