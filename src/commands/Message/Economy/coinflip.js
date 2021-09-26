const db = require('quick.db')

module.exports = {
  name: 'bet',
  aliases: ['coinflip'],
  cooldown: 1000 * 2,
  description: 'Jogue cara ou coroa com seus amigos!',
  category: 'economia',
  usage: '<usuário> <cara/coroa> <valor>',
  example: 'cara',
  permissoes: [],
  args: true,

  async run (client, message, args) {
    const user = message.mentions.users.first()
    if (user == message.author) return message.reply('Você não pode apostar consigo mesmo, bobinho')

    if (!user) return
    if (!args[1]) return message.channel.send(`${message.author} **|** Você deve colocar \`cara\` ou \`coroa\`!`)
    if (!args[2]) return message.channel.send(`${message.author} **|** Você deve colocar a quantidade que deseja apostar!`)

    if (isNaN(args[2])) {
      return message.reply(noargs)
    } else if (args[2].includes('-')) {
      message.reply('Você não pode apostar RCoins negativos!')
    }

    let reply = `${user}, Você deseja fazer uma aposta de ${args[2]} RCoins com ${message.author}?`

    const authorbal = await db.fetch(`money_${message.author.id}`)
    const userbal = await db.fetch(`money_${user.id}`)

    if (userbal < args[2]) {
      return message.reply(`💸 **|** ${user} Não tem   RCoins suficientes para apostar`)
    }

    if (authorbal < args[2]) {
      return message.reply('<:x_:856894534071746600> **|** Você não tem RCoins o suficiente para fazer apostas!')
    }

    if (user == client.user) reply = 'Opa, vamos apostar então!'
    message.reply(reply).then((msg) => {
      setTimeout(() => msg.react('✅'), 1000)

      const filterYes = (reaction, usuario) => reaction.emoji.name === '✅' && usuario.id === user.id
      const yesCollector = msg.createReactionCollector(filterYes, {
        max: 1,
        time: 60000
      })
      yesCollector.on('collect', () => {
        const array1 = ['cara', 'coroa']

        const rand = Math.floor(Math.random() * array1.length)

        if (!args[1] || args[1].toLowerCase() !== 'cara' && args[1].toLowerCase() !== 'coroa') {
          message.reply(noargs)
        } else if (args[1].toLowerCase() == array1[rand]) {
          message.reply(`💸 **|** Deu **${array1[rand]}**, você ganhou ${args[2]} RCoins!`)
          db.add(`coins_${message.author.id}`, args[2])
          db.subtract(`coins_${user.id}`, args[2])
        } else if (args[1].toLowerCase() != array1[rand]) {
          message.reply(`💸 **|** Deu **${array1[rand]}**, você perdeu dessa vez! ${user} Você ganhou ${args[2]} RCoins!`)
          db.add(`coins_${user.id}`, args[2])
          db.subtract(`coins_${message.author.id}`, args[2])
        }
      })
    })
  }
}
