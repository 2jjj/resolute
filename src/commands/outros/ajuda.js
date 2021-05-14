const db = require("quick.db");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {
  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

  
    let embed = new Discord.MessageEmbed()
    .setColor('#e1ff00')
    .setDescription(`> ***Olá ${message.author}, aqui estão minhas categorias com comandos!***
      \n » **Categorias:**\n
      <a:1__:836268679263027230> | Moderação
      <a:2_:836268689484546088> | Fun
      <a:3___:836268637257990184> | Outros
      <a:4_:836268669516251136> | Economia
      <:Voltar:836330128073687092> | Voltar
      \n » **Links:**
      > http://resolutebot.xyz
      \n » \`Desenvolvido por Spray#0007 | Versão 1.2.5b\`
    `)
    .setImage("https://cdn.discordapp.com/attachments/833789118986059836/833806087702446181/image0.gif")
  //
  message.channel.send(message.author, embed).then(msg => {
    msg.react(`<:Voltar:836330128073687092>`).then(() => {
      msg.react(`<a:1__:836268679263027230>`);
      msg.react(`<a:2_:836268689484546088>`);
      msg.react(`<a:3___:836268637257990184>`);
      msg.react(`<a:4_:836268669516251136>`);
    })
    
    //Emojis
    const voltar = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836330128073687092` && user.id == message.author.id, { time: 20000 })
    const moderacao = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268679263027230` && user.id == message.author.id, { time: 20000 })
    const fun = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268689484546088` && user.id == message.author.id, { time: 20000 })
    const outros = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268637257990184` && user.id == message.author.id, { time: 20000 })
    const economia = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268669516251136` && user.id == message.author.id, { time: 20000 })

    ////////////
    moderacao.on(`collect`, r => {
       let embed_1 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**» Categoria de Moderação:**\n
      > <:spr4yxyz:837798446584168468> | \`s.aviso\` @usuário
      > <:spr4yxyz:837798446584168468> | \`s.ban\` @usuário <motivo>
      > <:spr4yxyz:837798446584168468> | \`s.banlist\`
      > <:spr4yxyz:837798446584168468> | \`s.botinfo\` 
      > <:spr4yxyz:837798446584168468> | \`s.clear\`
      > <:spr4yxyz:837798446584168468> | \`s.kick\` @usuário
      > <:spr4yxyz:837798446584168468> | \`s.lock\`
      > <:spr4yxyz:837798446584168468> | \`s.servericon\` id do servidor
      > <:spr4yxyz:837798446584168468> | \`s.serverinfo\` id do servidor
      > <:spr4yxyz:837798446584168468> | \`s.userinfo\` id do usuário
      > <:spr4yxyz:837798446584168468> | \`s.unlock\`
      > <:spr4yxyz:837798446584168468> | \`s.warn\` @usuário
      `)
      .setImage("https://i.pinimg.com/originals/dd/16/ab/dd16ab8cb777b7ea951dec7092006fce.gif")
      .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
      msg.edit(embed_1)
      //r.users.remove(message.author.id)
    })

    ////////////
    fun.on(`collect`, r => {
      let embed_2 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**» Categoria de Diversão:**\n
      > <:spr4yxyz:837798446584168468> | \`s.wanted\` @usuário
      > <:spr4yxyz:837798446584168468> | \`s.laranjo\` <frase>
      > <:spr4yxyz:837798446584168468> | \`s.primeiraspalavras\` <frase>
      > <:spr4yxyz:837798446584168468> | \`s.carinho\` @usuário
      > <:spr4yxyz:837798446584168468> |  \`s.coinflip\` <cara ou coroa>
      > <:spr4yxyz:837798446584168468> | \`s.highfive\` @usuário
      > <:spr4yxyz:837798446584168468> | \`s.hug\` @usuário
      > <:spr4yxyz:837798446584168468> | \`s.kiss\` @usuário
      > <:spr4yxyz:837798446584168468> | \`s.meme\`
      > <:spr4yxyz:837798446584168468> | \`s.morder\` @usuário
      > <:spr4yxyz:837798446584168468> | \`s.pisar\` @usuário
      > <:spr4yxyz:837798446584168468> | \`s.say\` frase
      > <:spr4yxyz:837798446584168468> | \`s.ship\` @usuário
      > <:spr4yxyz:837798446584168468> | \`s.stonks\`
      > <:spr4yxyz:837798446584168468> | \`s.notstonks\`
      `)
      .setImage("https://i.pinimg.com/originals/58/58/97/58589775e6dfe9aad63363e06a38a3ea.gif")
      .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
      msg.edit(embed_2)
      //r.users.remove(message.author.id)
    })
  
    /////////////
    outros.on(`collect`, r => {
      let embed_3 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**» Outros comandos:**\n
      > <:spr4yxyz:837798446584168468> | \`s.ascii\`
      > <:spr4yxyz:837798446584168468> | \`s.avatar\` @usuário
      > <:spr4yxyz:837798446584168468> | \`s.clima\`
      > <:spr4yxyz:837798446584168468> | \`s.covid\` <pais>
      > <:spr4yxyz:837798446584168468> | \`s.emoji\` <emoji>
      > <:spr4yxyz:837798446584168468> | \`s.horas\`
      > <:spr4yxyz:837798446584168468> | \`s.ping\`
      > <:spr4yxyz:837798446584168468> | \`s.sorteador\`
      > <:spr4yxyz:837798446584168468> | \`s.status\`
      > <:spr4yxyz:837798446584168468> | \`s.sugestao\` <sugestão>
      > <:spr4yxyz:837798446584168468> | \`s.uptime\`
      > <:spr4yxyz:837798446584168468> | \`s.votar\`
      > <:spr4yxyz:837798446584168468> | \`s.steam\` <jogo>
      `)
      .setImage("https://i.imgur.com/VhLyg2r.gif")
      .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
      msg.edit(embed_3)
      //r.users.remove(message.author.id)
    })

    economia.on(`collect`, r => {
      let embed_4 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**» Categoria de Economia:**\n
      > <:spr4yxyz:837798446584168468> | \`s.daily\`
      > <:spr4yxyz:837798446584168468> | \`s.depositar\` <quantidade>
      > <:spr4yxyz:837798446584168468> | \`s.leaderboard\`
      > <:spr4yxyz:837798446584168468> | \`s.money\`
      > <:spr4yxyz:837798446584168468> | \`s.pay\` <@usuário>
      > <:spr4yxyz:837798446584168468> | \`s.roubar\` <@usuário>
      > <:spr4yxyz:837798446584168468> | \`s.saque\` <dinheiro>
      > <:spr4yxyz:837798446584168468> | \`s.setmoney\` | Admin+
      > <:spr4yxyz:837798446584168468> | \`s.trabalhar\`
      `)
      .setImage("http://pa1.narvii.com/5763/85377e06886cbaa577b87952dd985919f3ad0e38_00.gif")
      .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
      msg.edit(embed_4)
    })
    

    voltar.on(`collect`, r => {
      let embed = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`> ***Olá ${message.author}, aqui estão minhas categorias com comandos!***
        \n » **Comandos:**\n
        <:info:835206734225473546> | Moderação - <a:1__:836268679263027230>
        <:info:835206734225473546> | Fun - <a:2_:836268689484546088>
        <:info:835206734225473546> | Outros - <a:3___:836268637257990184>
        <:info:835206734225473546> | Economia - <a:4_:836268669516251136>
        <:info:835206734225473546> | Voltar - <:Voltar:836330128073687092>
        \n » **Links:**
        > http://resolutebot.xyz
        \n » **Feito por Spray#0007 | Versão 1.2.5b**
    `)
      .setImage("https://cdn.discordapp.com/attachments/833789118986059836/833806087702446181/image0.gif")
      msg.edit(embed)
  });
})
}