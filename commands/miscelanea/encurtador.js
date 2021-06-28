const tiny = require('tinyurl')

module.exports = {
    name: "encurtar",
    aliases: ['shorturl'],
    cooldown: 1000 * 2, 
    description: "Encurtar urls por ai!",
    category: "outros",
    usage: "<url>",

    async run (client, message, args) {

    let url = args[0]
     if(url) {
      tiny.shorten(url, function(res, err) {
        message.channel.send(`<:8512blurplelink:856520144843046922> **|** Sua URL foi encurtada com sucesso! **|** ${res}`)
      })
    }
  }
}