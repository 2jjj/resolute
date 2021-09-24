const db = require('quick.db')
const Discord = require('discord.js')
const ee = require('../../../config/embed.json')
const peixes = require('./peixes.json')

module.exports = {
  name: 'pescar',
  aliases: [''],
  cooldown: 1000 * 2,
  description: '',
  category: 'pescaria',
  usage: '',
  example: '',
  permissoes: [],
  args: false,

  async run (client, message, args, prefix) {
    const user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author || message.member
    db.add(`varinhas_${user.id}`, 1)

    let varinhas = db.fetch(`varinhas_${user.id}`)
    if (varinhas === null) varinhas = 0

    let iscas = db.fetch(`iscas_${user.id}`)
    if (iscas === null) iscas = 0

    if (varinhas < 1) {
      let embed = new Discord.MessageEmbed()
        .addField('Você não possui varinhas!', `Para comprar uma varinha digite \`${prefix}buy varinha\` e compre uma varinha.`)
        .setFooter(ee.footertext, ee.footericon)
        .setColor('#1E90FF')
      return message.reply({ embeds: [embed] })
    }

    if (varinhas >= 1) {
      if (iscas < 1) {
        let iscas = db.fetch(`iscas_${user.id}`)
        if (iscas === null) iscas = 0
        console.log(iscas)

        let embed_isca = new Discord.MessageEmbed()
          .addField('Você não possui iscas!', `Para comprar uma isca digite \`${prefix}buy iscas <quantidade>\` e compre uma isca.`)
          .setFooter(ee.footertext, ee.footericon)
          .setColor('#1E90FF')
        return message.reply({ embeds: [embed_isca] })
      } else {
        const baiacus = Math.floor(Math.random() * 6 + 1)
        const salmoes = Math.floor(Math.random() * 3 + 1)
        const bacalhais = Math.floor(Math.random() * 10 + 1)
        const bota = Math.floor(Math.random() * 2 + 1)
        const tilapias = Math.floor(Math.random() * 7 + 1)
        const pirapitingas = Math.floor(Math.random() * 14 + 1)
        const piraibas = Math.floor(Math.random() * 20 + 1)
        const pirararas = Math.floor(Math.random() * 4 + 1)
        console.log(baiacus)
        let embed_pescar = new Discord.MessageEmbed()
          .setTitle('<:pescaria:879504651739861064> Pescaria')
          .setDescription(`Você pescou e conseguiu:
                  ${baiacus} Baiacus
                  ${salmoes} Salmoes
                  ${bacalhais} Bacalhais
                  `)
          .setFooter(ee.footertext, ee.footericon)
          .setColor('#1E90FF')
        return message.reply({ embeds: [embed_pescar] })
      }
    }
  }
}
