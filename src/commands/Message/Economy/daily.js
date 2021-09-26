const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

module.exports = {
  name: 'daily',
  aliases: ['diaria'],
  cooldown: 1000 * 2,
  description: 'Resgate seu daily e ganhe uma quantidade determinada de coins!',
  category: 'economia',
  usage: '',
  example: '',
  permissoes: [],
  args: false,

  async run (client, message, args, prefix) {
    const user = message.author
    const timeout = 86400000
    const daily = await db.fetch(`daily_${user.id}`)
    const amount = Math.floor(Math.random() * 10000) + 1000
    const agoratem = db.fetch(`money_${user.id}`)
    if (agoratem === null) money = 0

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      const time = ms(timeout - (Date.now() - daily))

      const timeEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`<:outline_info_black_24dp:884959629124186172> **»** Você já recebeu sua recompensa diária!\n<:outline_event_black_24dp:889218032403120158> **»** Colete novamente daqui a **${time.hours} horas ${time.minutes} minutos e ${time.seconds} segundos!**`)
        .setFooter(`Requisitado por: ${message.author.username}`, message.author.displayAvatarURL({
          dynamic: true
        }))
      // .setThumbnail(`${message.guild.iconURL({dynamic: true})}`)
        .setTimestamp()
      message.reply({ embeds: [timeEmbed] })
    } else {
      //const time = ms(timeout - (Date.now() - daily))

      const moneyEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .addField(`<:outline_check_circle_black_24dp:884962192502423582> **»** Você recebeu **\`${amount}\`** RCoins!`, `<:outline_info_black_24dp:884959629124186172> **» Compre items com** \`${prefix}shop\` **!**`)
        .setFooter(`Requisitado por ${message.author.username}`, message.author.displayAvatarURL({
          dynamic: true
        }))
      // .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
      message.reply({ embeds: [moneyEmbed] })

      db.add(`money_${user.id}`, amount)
      db.set(`daily_${user.id}`, Date.now())
    }
  }
}
