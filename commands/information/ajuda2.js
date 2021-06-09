const db = require("quick.db");
const Discord = require("discord.js")

module.exports = {
  name: "ajuda2",
  aliases: ['help2'],
  cooldown: 1000 * 2, 
  description: "Minhas informações.",
  category: "info",
  usage: "",

  async run (client, message, args) {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = "s."
  
    var funn = client.commands.filter((cmd) => cmd.category === 'fun');
    var economia2 = client.commands.filter((cmd) => cmd.category === 'economia');
    var manipulacao = client.commands.filter((cmd) => cmd.category === 'manipulacao');
    var mod = client.commands.filter((cmd) => cmd.category === 'mod');
    //let music = client.commands.filter((cmd) => cmd.category === 'musica');
    var miscelanea = client.commands.filter((cmd) => cmd.category === 'outros');
    var config = client.commands.filter((cmd) => cmd.category === 'config');
    var minecraft = client.commands.filter((cmd) => cmd.category === 'minecraft');
    var info = client.commands.filter((cmd) => cmd.category === 'info');

    let embed = new Discord.MessageEmbed()
    .setColor('#e1ff00')
    .setDescription(`> **Olá ${message.author}, aqui estão minhas categorias com comandos!**
      \n » **Categorias:**\n
      <a:1__:836268679263027230> | Moderação
      <a:2_:836268689484546088> | Diversão
      <a:3___:836268637257990184> | Miscelânia
      <a:4_:836268669516251136> | Economia
      <a:5___:836268658795347990> | Configuráveis 
      <a:6_:836268649790439464> | Manipulação de imagens
      <:Voltar:836330128073687092> | Voltar
      \n » **Links:**
      > [Me adicione](https://invite.resolutebot.xyz)
      > [Suporte](https://discord.gg/VE9WeKZhPY)
      \n » \`Desenvolvido por Spray#0007 | Versão 1.7.0B\`
    `)
    .setImage("https://i.pinimg.com/originals/45/0f/b6/450fb615bd2b9a587d5a9b553341da87.gif")
  //
  message.channel.send(message.author, embed).then(msg => {
    msg.react(`<:Voltar:836330128073687092>`).then(() => {
      msg.react(`<a:1__:836268679263027230>`);
      msg.react(`<a:2_:836268689484546088>`);
      msg.react(`<a:3___:836268637257990184>`);
      msg.react(`<a:4_:836268669516251136>`);
      msg.react(`<a:5___:836268658795347990>`);
      msg.react(`<a:6_:836268649790439464>`);
    })
    
    const voltar = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836330128073687092` && user.id == message.author.id, { time: 150000 })
    const moderacao = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268679263027230` && user.id == message.author.id, { time: 150000 })
    const fun = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268689484546088` && user.id == message.author.id, { time: 150000 })
    const outros = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268637257990184` && user.id == message.author.id, { time: 150000 })
    const economia = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268669516251136` && user.id == message.author.id, { time: 150000 })
    const manipulacao2 = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268649790439464` && user.id == message.author.id, { time: 150000 })
    const configuraveis = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268658795347990` && user.id == message.author.id, { time: 150000 })
    const music = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `843602147051700284` && user.id == message.author.id, { time: 150000 })

    moderacao.on(`collect`, r => {
      let embed_1 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`<:ybs_defesa:852215040110362675> Moderação *[${mod.size}]*:\n\n\`${mod.map(cmd => cmd.name).join(' | ')}\``)
      .setImage("https://i.pinimg.com/originals/dd/16/ab/dd16ab8cb777b7ea951dec7092006fce.gif")
      msg.edit(embed_1)
      r.users.remove(message.author.id)
    })

    fun.on(`collect`, r => {
      let embed_2 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`😂 Diversão *[${funn.size}]*:\n\n\`${funn.map(cmd => cmd.name).join(' | ')}\``)
      .setImage("https://i.pinimg.com/originals/dd/16/ab/dd16ab8cb777b7ea951dec7092006fce.gif")
      msg.edit(embed_2)
      r.users.remove(message.author.id)
    })
  
    outros.on(`collect`, r => {
      let embed_3 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`<:ybs_status:851954702840627200> Miscelânea *[${miscelanea.size}]*:\n\n\`${miscelanea.map(cmd => cmd.name).join(' | ')}\``)
      .setImage("https://i.pinimg.com/originals/dd/16/ab/dd16ab8cb777b7ea951dec7092006fce.gif")
      msg.edit(embed_3)
      r.users.remove(message.author.id)
    })

    economia.on(`collect`, r => {
      let embed_4 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`<:ybs_dinheiro:852213985356939314> Economia *[${economia2.size}]*:\n\n\`${economia2.map(cmd => cmd.name).join(' | ')}\``)
      .setImage("https://i.pinimg.com/originals/dd/16/ab/dd16ab8cb777b7ea951dec7092006fce.gif")
      msg.edit(embed_4)
      r.users.remove(message.author.id)
    })

    configuraveis.on(`collect`, r => {
      let embed_5 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`<:ybs_config:851954339735666729> Configuráveis. *[${economia2.size}]*:\n\n\`${economia2.map(cmd => cmd.name).join(' | ')}\``)
      .setImage("https://i.pinimg.com/originals/dd/16/ab/dd16ab8cb777b7ea951dec7092006fce.gif")
      msg.edit(embed_5)
      r.users.remove(message.author.id)   
    })

    manipulacao2.on(`collect`, r => {
      let embed_6 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`<:ybs_usuarios:843619560316993567> Manipulação de imagens *[${manipulacao.size}]*:\n\n\`${manipulacao.map(cmd => cmd.name).join(' | ')}\``)
      .setImage("https://i.pinimg.com/originals/dd/16/ab/dd16ab8cb777b7ea951dec7092006fce.gif")
      msg.edit(embed_6)
      r.users.remove(message.author.id)   
    })

    voltar.on(`collect`, r => {
      let embed = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`> **Olá ${message.author}, aqui estão minhas categorias com comandos!**
      \n » **Categorias:**\n
      <a:1__:836268679263027230> | Moderação
      <a:2_:836268689484546088> | Diversão
      <a:3___:836268637257990184> | Miscelânia
      <a:4_:836268669516251136> | Economia
      <a:5___:836268658795347990> | Configuráveis 
      <a:6_:836268649790439464> | Manipulação de imagens
      <:Voltar:836330128073687092> | Voltar
      \n » **Links:**
      > [Me adicione](https://invite.resolutebot.xyz)
      > [Suporte](https://discord.gg/VE9WeKZhPY)
      \n » \`Desenvolvido por Spray#0007 | Versão 1.7.0B\`
    `)
    .setImage("https://i.pinimg.com/originals/45/0f/b6/450fb615bd2b9a587d5a9b553341da87.gif")
      msg.edit(embed)
  });
})
}}