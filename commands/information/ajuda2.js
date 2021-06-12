const Discord = require("discord.js")

module.exports = {
  name: "ajuda2",
  aliases: ['help2'],
  cooldown: 1000 * 2, 
  description: "Minhas informações.",
  category: "info",
  usage: "",

  async run (client, message, args) {
  
    let fun2 = client.commands.filter((cmd) => cmd.category === 'fun');
    let economia2 = client.commands.filter((cmd) => cmd.category === 'economia');
    let manipulacao2 = client.commands.filter((cmd) => cmd.category === 'manipulacao');
    let mod = client.commands.filter((cmd) => cmd.category === 'mod');
    //let music = client.commands.filter((cmd) => cmd.category === 'musica');
    let miscelanea2 = client.commands.filter((cmd) => cmd.category === 'outros');
    let config2 = client.commands.filter((cmd) => cmd.category === 'config');
    let minecraft2 = client.commands.filter((cmd) => cmd.category === 'minecraft');
    let info2 = client.commands.filter((cmd) => cmd.category === 'info');
    let botoes2 = client.commands.filter((cmd) => cmd.category === 'botoes');

    let embed = new Discord.MessageEmbed()
    .setColor('#e1ff00')
    .setDescription(`> **Olá ${message.author}, aqui estão minhas categorias com comandos!**
      \n » **Categorias:**\n
      <:1_:852540115599228978> | Moderação
      <:2_:852540115595034704> | Moderação
      <:3_:852540115527925771> | Informação
      <:4_:852540115582844978> | Botões
      <:5_:852540115468288001> | Miscelânea 
      <:6_:852540115476676608> | Economia
      <:7_:852540115451510794> | Manipulação de imagens
      <:8_:852540115485065216> | Configuráveis
      <:9_:852540115582320650> | Diversão
      <:back~1:852540115388596254> | Voltar
      \n » **Links:**
      > [Me adicione](https://invite.resolutebot.xyz)
      > [Suporte](https://discord.gg/VE9WeKZhPY)
      \n » \`Desenvolvido por Spray#0007 | Versão 1.7.0B\`
    `)
    .setImage("https://i.pinimg.com/originals/45/0f/b6/450fb615bd2b9a587d5a9b553341da87.gif")
  //
  message.channel.send(message.author, embed).then(msg => {
    msg.react(`<:back~1:852540115388596254>`).then(() => {
      msg.react(`<:1_:852540115599228978>`);
      msg.react(`<:2_:852540115595034704>`);
      msg.react(`<:3_:852540115527925771>`);
      msg.react(`<:4_:852540115582844978>`);
      msg.react(`<:5_:852540115468288001>`);
      msg.react(`<:6_:852540115476676608>`);
      msg.react(`<:7_:852540115451510794>`);
      msg.react(`<:8_:852540115485065216>`);
      msg.react(`<:9_:852540115582320650>`);
    })
    
    const voltar = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `852540115388596254` && user.id == message.author.id, { time: 150000 })

    const moderacao = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `852540115599228978` && user.id == message.author.id, { time: 150000 })
    const info = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `852540115595034704` && user.id == message.author.id, { time: 150000 })
    const botoes = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `852540115527925771` && user.id == message.author.id, { time: 150000 })
    const miscelanea = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `852540115582844978` && user.id == message.author.id, { time: 150000 })
    const economia = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `852540115468288001` && user.id == message.author.id, { time: 150000 })
    const manipulacao = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `852540115476676608` && user.id == message.author.id, { time: 150000 })
    const config = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `852540115451510794` && user.id == message.author.id, { time: 150000 })
    const fun = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `852540115485065216` && user.id == message.author.id, { time: 150000 })
    const minecraft = msg.createReactionCollector((reaction, user) => reaction.emoji.id == `852540115582320650` && user.id == message.author.id, { time: 150000 })

    moderacao.on(`collect`, r => {
      let embed_1 = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setDescription(`<:ybs_defesa:852215040110362675> Moderação *[${mod.size}]*:\n\n\`${mod.map(cmd => cmd.name).join(' | ')}\``)
      .setImage("https://i.pinimg.com/originals/dd/16/ab/dd16ab8cb777b7ea951dec7092006fce.gif")
      msg.edit(embed_1)
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