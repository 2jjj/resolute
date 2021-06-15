const tiny = require('tinyurl')

module.exports = {
    name: "encurtar",
    aliases: ['shorturl'],
    cooldown: 1000 * 2, 
    description: "Encurtar urls por ai!",
    category: "outros",
    usage: "<texto>",

    async run (client, message, args) {

    // ----- Strings ----- \\
    let url = args[0]
    // ----- Shorter ----- \\
    if (!url) {
      return message.reply('Coloque algum url para eu encurtar')
    } else {
      tiny.shorten(url, function(res, err) {
        message.channel.send("Url Encurtado com Sucesso! " + res)
      })
    }
  }
}