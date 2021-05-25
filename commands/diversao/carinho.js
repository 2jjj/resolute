//Resolute 0.0.5

const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: "carinho",
  aliases: [],
  cooldown: 1000 * 2, 
  description: "dev",
  category: "fun",

  async run (client, message, args) {
  
  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."
  
  var list = [
    'https://imgur.com/2lacG7l.gif',
    'https://imgur.com/UWbKpx8.gif',
    'https://imgur.com/4ssddEQ.gif',
    'https://imgur.com/2k0MFIr.gif',
    'https://imgur.com/nPr3s5D.gif',
    'https://imgur.com/LUypjw3.gif',
    'https://imgur.com/F3cjr3n.gif',
    'https://imgur.com/NNOz81F.gif',
    'https://imgur.com/cqIJIh4.gif',
    'https://imgur.com/5OQMI1m.gif',
    'https://imgur.com/48c0jVX.gif',
    'https://imgur.com/Iq9eZ5o.gif'
  ]

  var list1 = [
    'https://imgur.com/2lacG7l.gif',
    'https://imgur.com/UWbKpx8.gif',
    'https://imgur.com/4ssddEQ.gif',
    'https://imgur.com/2k0MFIr.gif',
    'https://imgur.com/nPr3s5D.gif',
    'https://imgur.com/LUypjw3.gif',
    'https://imgur.com/F3cjr3n.gif',
    'https://imgur.com/NNOz81F.gif',
    'https://imgur.com/cqIJIh4.gif',
    'https://imgur.com/5OQMI1m.gif',
    'https://imgur.com/48c0jVX.gif',
    'https://imgur.com/Iq9eZ5o.gif'
  ]

  var rand = list[Math.floor(Math.random() * list.length)]
  var rand1 = list1[Math.floor(Math.random() * list1.length)]
  let user = message.mentions.users.first()

  if (!user) {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."

    var nouser = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('<a:__:778990435938336769> Erro.')
      .setDescription('`' + prefix + 'carinho @user`')
    return message.reply(nouser)
  }

  if (user.id === message.author.id) {
    return message.inlineReply('Você não pode usar este comando com você mesmo.')
  }

  let avatar = message.author.displayAvatarURL({ format: 'png' })
  let avatar1 = user.displayAvatarURL({ format: 'png' })
  var embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription(`${message.author} está te dando carinho ${user}`, avatar)
    .setImage(rand)
    .setFooter('Clique em 🔁 para retribuir')

  var embed2 = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription(`${user} também acariciou você ${message.author} `, avatar1)
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
}}