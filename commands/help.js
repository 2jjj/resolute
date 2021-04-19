const Discord = require('discord.js');

exports.run = async (bot, message, args) => {

  let embed = new Discord.MessageEmbed()
    .setColor('#e1ff00')
    .setDescription(`**<a:spr4y:833819662894628884> Comando de ajuda. <a:spr4y:833819662894628884> 
      \n> Moderação - <a:sprayzado:833804539332657232>
      \n> Fun - 🤖
      \n> Outros - 👽
      **
    `)
    .setImage("https://cdn.discordapp.com/attachments/833789118986059836/833806087702446181/image0.gif")
    .setThumbnail("https://cdn.discordapp.com/attachments/833789118986059836/833806024279851068/download.gif")
  message.channel.send(message.author, embed).then(msg => {
    msg.react(`⬅️`).then(() => {
      msg.react(`<a:sprayzado:833804539332657232>`);
      msg.react(`🤖`);
      msg.react(`👽`);
    })

    const voltar = msg.createReactionCollector((reaction, user) => reaction.emoji.name == `⬅️` && user.id == message.author.id, { time: 20000 })
    const outros = msg.createReactionCollector((reaction, user) => reaction.emoji.name == `👽` && user.id == message.author.id, { time: 20000 })
    const fun = msg.createReactionCollector((reaction, user) => reaction.emoji.name == `🤖` && user.id == message.author.id, { time: 20000 })
    const moderacao = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `833804539332657232` && user.id == message.author.id, { time: 20000 })

    moderacao.on(`collect`, r => {

      //embed moderação.
      let embed_1 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**<a:spr4y:833819662894628884> Moderação <a:spr4y:833819662894628884> 
        \n> s.ban
        \n> s.botinfo
        \n> s.clear
        \n> s.inviteblock
        \n> s.kick
        \n> s.warn
        \n> s.help
        \n> s.userinfo
        \n> s.avatar
        \n> s.status
        \n> s.sugestão
        \n> s.uptime
        \n> s.ping
        \n> s.emoji
        **
      `)
      .setImage("https://cdn.discordapp.com/attachments/833789118986059836/833824445742448680/image8.gif")
      .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
      msg.edit(embed_1)
      r.users.remove(message.author.id)
    })

    fun.on(`collect`, r => {
      let embed_2 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**<a:spr4y:833819662894628884> Fun <a:spr4y:833819662894628884> 
        \n> s.coinflip
        \n> s.kiss
        \n> s.hug
        \n> s.say
        **
      `)
      .setImage("https://cdn.discordapp.com/attachments/833789118986059836/833824309499002900/image0_2.gif")
      .setThumbnail("https://cdn.discordapp.com/attachments/833789118986059836/833806024279851068/download.gif")
      msg.edit(embed_2)
      r.users.remove(message.author.id)
    })
  
    outros.on(`collect`, r => {
      let embed_3 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**<a:spr4y:833819662894628884> Outros <a:spr4y:833819662894628884> 
        \n> INDISPONIVEL POR ENQUANTO.
        **
      `)
      .setImage("https://cdn.discordapp.com/attachments/833789118986059836/833824277832663040/a_9d9bbd759d56a3bedbf6aaedf9ef1507.gif")
      .setThumbnail("https://cdn.discordapp.com/attachments/833789118986059836/833806024279851068/download.gif")
      msg.edit(embed_3)
      r.users.remove(message.author.id)
    })

    voltar.on(`collect`, r => {
      let embed_voltar = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**<a:spr4y:833819662894628884> Comando de ajuda. <a:spr4y:833819662894628884> 
        \n> Moderação - 🚓
        \n> Fun - 🤖
        \n> Outros - 👽
        **
      `)
      .setImage("https://cdn.discordapp.com/attachments/833789118986059836/833806087702446181/image0.gif")
      .setThumbnail("https://cdn.discordapp.com/attachments/833789118986059836/833806024279851068/download.gif")
      msg.edit(embed_voltar)
      r.users.remove(message.author.id)
    })
  })
}