const Discord = require('discord.js')
const Canvas = require('canvas')
const canvas = Canvas.createCanvas(384, 128)

module.exports = {
  name: 'ship',
  aliases: [],
  cooldown: 1000 * 2,
  description: 'Veja se um casal daria certo com este comando!',
  category: 'misc',
  usage: '@user1 @user2',
  example: '@Spray#0007 @px0#0001',
  permissoes: [],
  args: true,

  async run (client, message, args, cmduser, text, prefix, player) {
    if (!args[0]) return

    const membro1 = message.mentions.members.first(2)[0] || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(client.user.id)
    const membro2 = message.mentions.members.first(2)[1] || message.guild.members.cache.get(args[1]) || message.guild.members.cache.get(message.author.id)

    if (!membro1 || !membro2) return message.channel.send('Você precisa mencionar 2 pessoas!')
    if (membro1 === membro2) return message.channel.send('Mencione duas pessoas diferentes!')

    const amor = Math.floor(Math.random() * 101)
    const loveIndex = Math.floor(amor / 10)
    const loveLevel = '█'.repeat(loveIndex) + '.'.repeat(10 - loveIndex)

    const nomeFim1 = membro1.user.username.length
    const nomeFim2 = membro2.user.username.length

    const calc1 = nomeFim1 - 3
    const calc2 = nomeFim2 - 3

    let nomeship
    if (amor > 60) {
      nomeship = membro1.user.username.slice(0, 3) + membro2.user.username.slice(0, 3)
    } else if (amor >= 40) {
      nomeship = membro1.user.username.slice(0, calc1) + membro2.user.username.slice(0, calc2)
    } else {
      nomeship = membro1.user.username.slice(calc1, nomeFim1) + membro2.user.username.slice(calc2, nomeFim2)
    }

    let emoticon
    if (amor > 60) {
      emoticon = 'https://cdn.discordapp.com/attachments/727109164333138013/789198401903394826/heart.png'
    } else if (amor >= 40) {
      emoticon = 'https://cdn.discordapp.com/attachments/727109164333138013/789198402726527006/idontno.png'
    } else {
      emoticon = 'https://cdn.discordapp.com/attachments/727109164333138013/789198399508578374/sad.png'
    }

    let desc
    if (amor > 90) {
      desc = ':sparkling_heart: HMMM, isso vai acontecer ou não? :sparkling_heart:\n``' + membro1.user.username + '``\n``' + membro2.user.username + '``\n:heart: ``' + nomeship + '`` Este é o casal perfeito! :heart:'
    } else if (amor >= 70) {
      desc = ':sparkling_heart: HMMM, isso vai acontecer ou não? :sparkling_heart:\n``' + membro1.user.username + '``\n``' + membro2.user.username + '``\n:neutral_face: ``' + nomeship + '`` Esses aqui já estão se pegando e não contaram pra ninguém! :neutral_face:'
    } else if (amor >= 45) {
      desc = ':sparkling_heart: HMMM, isso vai acontecer ou não? :sparkling_heart:\n``' + membro1.user.username + '``\n``' + membro2.user.username + '``\n:no_mouth: ``' + nomeship + '`` Talvez só precise que o ' + membro2.user.username + ' queira... :no_mouth:'
    } else {
      desc = ':sparkling_heart: HMMM, isso vai acontecer ou não? :sparkling_heart:\n``' + membro1.user.username + '``\n``' + membro2.user.username + '``\n:cry: ``' + nomeship + '`` Eu realmente queria dizer que é possível, mas ... :cry: '
    }

    const canvas = Canvas.createCanvas(384, 128)
    const ctx = canvas.getContext('2d')

    const emote = await Canvas.loadImage(emoticon)
    const foto1 = await Canvas.loadImage(membro1.user.displayAvatarURL({
      format: 'png'
    }))
    const foto2 = await Canvas.loadImage(membro2.user.displayAvatarURL({
      format: 'png'
    }))

    ctx.drawImage(emote, 125, 0, 128, 128)
    ctx.drawImage(foto1, -10, 0, 128, 128)
    ctx.drawImage(foto2, 260, 0, 128, 128)

    const amorat = new Discord.MessageAttachment(canvas.toBuffer(), 'ship.png')

    const amorEmbed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('**' + amor + '%** [`' + loveLevel + '`]')
      .setFooter('Resolute')
      .setImage('attachment://ship.png')
    message.reply({ content: '<@' + message.author.id + '> \n' + desc, embeds: [amorEmbed], files: [amorat] })
  }
}
