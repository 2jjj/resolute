const Discord = require('discord.js');
exports.run = async (bot, message, args) => {
  let embed = new Discord.MessageEmbed()
    .setColor('#e1ff00')
    .setDescription(`> ***Olá ${message.author}, aqui estão minhas categorias com comandos!***
      \n » **Comandos**:
      > Moderação - <a:1__:836268679263027230>
      > Fun - <a:2_:836268689484546088>
      > Outros - <a:3___:836268637257990184>
      > Random - <a:4_:836268669516251136>
      > Games - <a:5___:836268658795347990>
      > Voltar - <:Voltar:836330128073687092>
      \n » **Links**:
      > http://spr4y.xyz/resolute
    `)
    .setImage("https://cdn.discordapp.com/attachments/833789118986059836/833806087702446181/image0.gif")
  //
  message.channel.send(message.author, embed).then(msg => {
    msg.react(`<:Voltar:836330128073687092>`).then(() => {
      msg.react(`<a:1__:836268679263027230>`);
      msg.react(`<a:2_:836268689484546088>`);
      msg.react(`<a:3___:836268637257990184>`);
      msg.react(`<a:4_:836268669516251136>`);
      msg.react(`<a:5___:836268658795347990>`);
    })
    
    //Emojis
    const voltar = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836330128073687092` && user.id == message.author.id, { time: 20000 })
    const moderacao = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268679263027230` && user.id == message.author.id, { time: 20000 })
    const fun = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268689484546088` && user.id == message.author.id, { time: 20000 })
    const outros = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268637257990184` && user.id == message.author.id, { time: 20000 })
    const random = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268669516251136` && user.id == message.author.id, { time: 20000 })
    const games = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268658795347990` && user.id == message.author.id, { time: 20000 })

    ////////////
    moderacao.on(`collect`, r => {
       let embed_1 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**» Categoria de Moderação:**\n
      > **s.aviso**
      > **s.ban**
      > **s.banlist**
      > **s.botinfo**
      > **s.clear**
      > **s.inviteblock**
      > **s.kick**
      > **s.lock**
      > **s.report**
      > **s.servericon**
      > **s.serverinfo**
      > **s.userinfo**
      > **s.unlock**
      > **s.warn**
      > **s.welcome**
      `)
      .setImage("https://cdn.discordapp.com/attachments/833789118986059836/833824277832663040/a_9d9bbd759d56a3bedbf6aaedf9ef1507.gif")
      .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
      msg.edit(embed_1)
      //r.users.remove(message.author.id)
    })

    ////////////
    fun.on(`collect`, r => {
      let embed_2 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**» Categoria de Diversão:**\n
      > **s.carinho**
      > **s.coinflip**
      > **s.highfive**
      > **s.hug**
      > **s.kiss**
      > **s.matar**
      > **s.meme**
      > **s.morder**
      > **s.pisar**
      > **s.say**
      > **s.ship**
      `)
      .setImage("https://cdn.discordapp.com/attachments/833789118986059836/833824277832663040/a_9d9bbd759d56a3bedbf6aaedf9ef1507.gif")
      .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
      msg.edit(embed_2)
      //r.users.remove(message.author.id)
    })
  
    /////////////
    outros.on(`collect`, r => {
      let embed_3 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**» Outros comandos:**\n
      > **s.ascii**
      > **s.avatar**
      > **s.clima**
      > **s.covid**
      > **s.emoji**
      > **s.horas**
      > **s.ping**
      > **s.sorteador**
      > **s.status**
      > **s.sugestão**
      > **s.uptime**
      > **s.votar**
      `)
      .setImage("https://cdn.discordapp.com/attachments/833789118986059836/833824277832663040/a_9d9bbd759d56a3bedbf6aaedf9ef1507.gif")
      .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
      msg.edit(embed_3)
      //r.users.remove(message.author.id)
    })

    random.on(`collect`, r => {
      let embed_4 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**» Categoria de Random:**\n
      > **s.stonks**
      > **s.notstonks**
      `)
      .setImage("https://cdn.discordapp.com/attachments/833789118986059836/833824277832663040/a_9d9bbd759d56a3bedbf6aaedf9ef1507.gif")
      .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
      msg.edit(embed_4)
    })
    
    games.on(`collect`, r => {
      let embed_5 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**» Categoria de Games:**\n
      > **s.minecraft**
      > **s.valorant**
      > **s.steam**
      `)
      .setImage("https://cdn.discordapp.com/attachments/833789118986059836/833824277832663040/a_9d9bbd759d56a3bedbf6aaedf9ef1507.gif")
      .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
      msg.edit(embed_5)
    })
    
  

    voltar.on(`collect`, r => {
      let embed = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`> ***Olá ${message.author}, aqui estão minhas categorias com comandos!***
        \n » **Comandos**:
        > Moderação - <a:1__:836268679263027230>
        > Fun - <a:2_:836268689484546088>
        > Outros - <a:3___:836268637257990184>
        > Random - <a:4_:836268669516251136>
        > Games - <a:5___:836268658795347990>
        > Voltar - <:Voltar:836330128073687092>
        \n » **Links**:
        > http://spr4y.xyz/resolute
      `)
      .setImage("https://cdn.discordapp.com/attachments/833789118986059836/833806087702446181/image0.gif")
      msg.edit(embed)
  });
})
} 
