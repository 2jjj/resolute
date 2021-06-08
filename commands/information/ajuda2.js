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
  
    let fun = client.commands.filter((cmd) => cmd.category === 'fun');
    let economia = client.commands.filter((cmd) => cmd.category === 'economia');
    let manipulacao = client.commands.filter((cmd) => cmd.category === 'manipulacao');
    let mod = client.commands.filter((cmd) => cmd.category === 'mod');
    //let music = client.commands.filter((cmd) => cmd.category === 'musica');
    let miscelanea = client.commands.filter((cmd) => cmd.category === 'outros');
    let config = client.commands.filter((cmd) => cmd.category === 'config');
    let minecraft = client.commands.filter((cmd) => cmd.category === 'minecraft');
    let info = client.commands.filter((cmd) => cmd.category === 'info');

    let embed = new Discord.MessageEmbed()
    .setColor('#e1ff00')
    .setDescription(`> **Olá ${message.author}, aqui estão minhas categorias com comandos!**
      \n » **Categorias:**\n
      <a:1__:836268679263027230> | Moderação
      <a:2_:836268689484546088> | Diversão
      <a:3___:836268637257990184> | Outros
      <a:4_:836268669516251136> | Economia
      <a:5___:836268658795347990> | Configuráveis 
      <a:6_:836268649790439464> | Manipulação de imagens
      <:Voltar:836330128073687092> | Voltar
      \n » **Links:**
      > [Me adicione](https://invite.resolutebot.xyz)
      > [Suporte](https://discord.gg/VE9WeKZhPY)
      \n » \`Desenvolvido por MrSprayX#0012 | Versão 0.0.5\`
      \n » \`Use ${prefix}report para reportar bugs.\`
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
    
    //Emojis
    const voltar = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836330128073687092` && user.id == message.author.id, { time: 150000 })
    const moderacao = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268679263027230` && user.id == message.author.id, { time: 150000 })
    const fun = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268689484546088` && user.id == message.author.id, { time: 150000 })
    const outros = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268637257990184` && user.id == message.author.id, { time: 150000 })
    const economia = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268669516251136` && user.id == message.author.id, { time: 150000 })
    const ticket = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268649790439464` && user.id == message.author.id, { time: 150000 })
    const configuraveis = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `836268658795347990` && user.id == message.author.id, { time: 150000 })
    const music = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `843602147051700284` && user.id == message.author.id, { time: 150000 })

    ////////////
    moderacao.on(`collect`, r => {
       let embed_1 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**» Categoria de Moderação:**\n

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

      `)
      .setImage("https://i.pinimg.com/originals/24/5f/33/245f33d5b2bbc7de141c8f54bfeab550.gif")
      //o ngc q vai em cima
      .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
      msg.edit(embed_4)
    })

    configuraveis.on(`collect`, r => {
      let embed_5 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**» Categoria de Configuraveis:**\n
      > <:spr4yxyz:837798446584168468> | \`${prefix}setprefix\` <prefixo>
      `)
      .setImage("http://pa1.narvii.com/5763/85377e06886cbaa577b87952dd985919f3ad0e38_00.gif")
      msg.edit(embed_5)    
    })

    ticket.on(`collect`, r => {
      let embed_6 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`**» Categoria de Manipulação de imagens:**\n
  
      `)
      .setImage("http://38.media.tumblr.com/4f09c72a6141a021d65d002b13287231/tumblr_nme0vyx2BI1qdpo2no1_500.gif")
      msg.edit(embed_6)    
    })

    voltar.on(`collect`, r => {
      let embed = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`> **Olá ${message.author}, aqui estão minhas categorias com comandos!**
      \n » **Categorias:**\n
      <a:1__:836268679263027230> | Moderação
      <a:2_:836268689484546088> | Diversão
      <a:3___:836268637257990184> | Outros
      <a:4_:836268669516251136> | Economia
      <a:5___:836268658795347990> | Configuráveis 
      <a:6_:836268649790439464> | Manipulação de imagens
      <:music:843602147051700284> | Música
      <:Voltar:836330128073687092> | Voltar
      \n » **Links:**
      > [Me adicione!](https://resolutebot.xyz)
      > [Suporte](https://discord.gg/VE9WeKZhPY)
      \n » \`Desenvolvido por MrSprayX#0012 | Versão 0.0.5\`
      \n » \`Use ${prefix}report para reportar bugs.\`
    `)
    .setImage("https://i.pinimg.com/originals/45/0f/b6/450fb615bd2b9a587d5a9b553341da87.gif")
      msg.edit(embed)
  });
})
}}