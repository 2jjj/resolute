const Discord = require('discord.js')
const { get } = require('axios')
const ocr = '4732532ffd88957'

module.exports = {
  name: 'ocr',
  aliases: ['ler'],
  cooldown: 1000 * 2,
  description: 'Consiga ler textos de imagens!',
  category: 'misc',
  usage: '<imagem>',
  example: '<imagem>',
  permissoes: [],
  args: true,

  async run (client, message, args) {
    if (!args[0]) return

    let imagem = message.attachments.first()
    if (message.attachments) {
      imagem = imagem.url
    } else {
      imagem = args.join(' ')
    }

    console.log(imagem)

    try {
      get(`https://api.ocr.space/parse/imageurl?apikey=${ocr}&url=${imagem}`).then(response => {
        const embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(`:frame_photo: OCR | ${message.author.username}`)
          .setDescription(`\`\`\`${response.data.ParsedResults.map(parse => parse.ParsedText.replace(/`/g, ''))}\`\`\``)
        message.reply({ embeds: [embed] })
      })
    } catch (e) {
      console.log(e)
    }
  }
}
