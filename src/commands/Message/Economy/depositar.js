const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'depositar',
  aliases: ['dep'],
  cooldown: 1000 * 2,
  description: 'Deposite suas coins no banco!',
  category: 'economia',
  usage: '<quantidade>',
  example: '1000',
  permissoes: [],
  args: true,

  async run (client, message, args) {
    let member = db.fetch(`money_${message.author.id}`)
    if (member == null) member = 0

    let bank = db.fetch(`bank_${message.author.id}`)
    if (bank == null) bank = 0

    if (!args[0]) return

    const embed4 = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('<:x_:856894534071746600> **|** Você não dinheiro suficiente para realizar o deposito!')

    if (member < args[0]) {
      return message.reply({ embeds: [embed4] })
    };

    const embed5 = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('Você tem que colocar um valor maior que 0 para realizar o deposito!')

    if (args[0] < 0) {
      return message.reply({ embeds: [embed5] })
    };

    const embed6 = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('Você precisa colocar um valor numérico para realizar o deposito!')

    if (isNaN(args[0])) {
      return message.reply({ embeds: [embed6] })
    };

    const embed7 = new Discord.MessageEmbed()
      .setTitle('🏦 | Depósito')
      .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
      .setDescription(`Você depositou **\`R$${args[0]}\`** RCoins!`)
      .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
        dynamic: true
      }))
      .setTimestamp()
    message.reply({ embeds: [embed7] })

    db.add(`bank_${message.author.id}`, args[0])
    db.subtract(`money_${message.author.id}`, args[0])
  }
}
