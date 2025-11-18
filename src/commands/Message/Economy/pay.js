const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'pay',
  aliases: ['pagar'],
  cooldown: 1000 * 2,
  description: 'Pague para alguém que está devendo!',
  category: 'economia',
  usage: '@user <quantidade>',
  example: 'Spray#7725 1000',
  permissoes: [],
  args: true,

  async run (client, message, args) {
    const user = message.mentions.members.first()
    const member = db.fetch(`money_${message.author.id}`)

    if (!user) return

    const embed2 = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('Coloque o valor do pagamento!')
      .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
        dynamic: true
      }))
      .setTimestamp()

    if (!args[1]) {
      return message.reply({ embeds: [embed2] })
    }

    const embed4 = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('Você não possui coins suficientes para realizar o pagamento!')
      .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
        dynamic: true
      }))
      .setTimestamp()

    if (member < args[1]) {
      return message.reply({ embeds: [embed4] })
    }

    const embed5 = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('Você tem que colocar um valor maior que **0** para realizar o pagamento!')
      .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
        dynamic: true
      }))
      .setTimestamp()

    if (args[1] < 0) {
      return message.reply({ embeds: [embed5] })
    }

    const embed7 = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('Você tem que colocar um valor numerico para realizar o pagamento!')
      .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
        dynamic: true
      }))
      .setTimestamp()

    if (isNaN(args[1])) {
      return message.reply({ embeds: [embed7] })
    }

    const embed6 = new Discord.MessageEmbed()
      .setTitle('Pagamento')
      .setColor('RANDOM')
      .setDescription(`Você pagou **\`${args[1]}\`** Coins para o ${user}!`)
      .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
      .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
        dynamic: true
      }))
      .setTimestamp()
    message.reply({ embeds: [embed6] })

    db.add(`money_${user.id}`, args[1])
    db.subtract(`money_${message.author.id}`, args[1])
  }
}
