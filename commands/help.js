const Discord = require('discord.js');
exports.run = async (bot, message, args) => {
  let embed = new Discord.MessageEmbed()
    .setTitle("Comando de Ajuda!")
    .setURL("http://spr4y.xyz/resolute.html")
    .setColor(0x00AE86)
    .setDescription("👽 - Outros comandos\n🤖 - Comandos de diversão\n🚓 - Moderação.\n")
    .setFooter("Help, ")
    .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
    .setTimestamp()

  message.channel.send(message.author, embed).then(msg => {
    msg.react(`⬅️`).then(() => {
      msg.react(`👽`);
      msg.react(`🤖`);
      msg.react(`🚓`);
    })

    const outros = msg.createReactionCollector((reaction, user) => reaction.emoji.name == `👽` && user.id == message.author.id, { time: 20000 })
    const fun = msg.createReactionCollector((reaction, user) => reaction.emoji.name == `🤖` && user.id == message.author.id, { time: 20000 })
    const moderacao = msg.createReactionCollector((reaction, user) => reaction.emoji.name == `🚓` && user.id == message.author.id, { time: 20000 })
    const voltar = msg.createReactionCollector((reaction, user) => reaction.emoji.name == `⬅️` && user.id == message.author.id, { time: 20000 })

    moderacao.on(`collect`, r => {

      //embed moderação.
      let embed_1 = new Discord.MessageEmbed()
      .setTitle("Moderação - Resolute")
      .setAuthor("Resolute", "https://cdn.discordapp.com/avatars/798574984582791208/3a984f4ef094773d2bd139a0ea9fbddc.png?size=1024")
      .setColor(0x00AE86)
      .setDescription("Emoji - adicionar emojis de outros servidores para o seu!\n\n Invite Block - Bloqueia invites de outros servidores!\n\n UserInfo - Mostrar a informação de um usuário que você marcar.\n Servericon - Mostrar o icone do servidor\n Serverinfo - Mostrar as informações do servidor.\n\n Ban - Dê ban alguém do servidor.\n\n Warn - Avise algum membro do servidor.\n\n Kick - Chute alguém do servidor.\n\n\n")
      .setFooter("Help, ")
      .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
      .setTimestamp()
      msg.edit(embed_1)
      r.users.remove(message.author.id)
    })

    fun.on(`collect`, r => {
      let embed_2 = new Discord.MessageEmbed()
        .setTitle("Fun - Resolute")
        .setAuthor("Resolute", "https://cdn.discordapp.com/avatars/798574984582791208/3a984f4ef094773d2bd139a0ea9fbddc.png?size=1024")
        .setColor(0x00AE86)
        .setDescription("Avatar - Veja o avatar de alguém.\n\n Kiss - Beije alguém virtualmente.\n\n Hug - Abraçe alguém virtualmente.\n\n Coinflip - Jogue cara ou coroa.\n\n\n")
        .setFooter("Help, ")
        .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
        .setTimestamp()
      msg.edit(embed_2)
      r.users.remove(message.author.id)
    })
  
    outros.on(`collect`, r => {
      let embed_3 = new Discord.MessageEmbed()
        .setTitle("Outros - Resolute")
        .setAuthor("Resolute", "https://cdn.discordapp.com/avatars/798574984582791208/3a984f4ef094773d2bd139a0ea9fbddc.png?size=1024")
        .setColor(0x00AE86)
        .setDescription("Sugestão - De uma Sugestão para o servidor.\n\nUptime - Veja quanto tempo estou online.\n\nPing - Veja a minha latência\nLembrete - Defina algum lembrete.\n\nBotinfo - Saiba as informações sobre o Resolute.\n\nSay - Para eu falar oque você deseja!\n\n\n")
        .setFooter("Help, ")
        .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
        .setTimestamp()
      msg.edit(embed_3)
      r.users.remove(message.author.id)
    })

    voltar.on(`collect`, r => {
      let embed_voltar = new Discord.MessageEmbed()
        .setTitle("Comando de Ajuda!")
        .setURL("http://spr4y.xyz/resolute.html")
        .setColor(0x00AE86)
        .setDescription("🚓 - Moderação.\n\n\n🤖 - Comandos de diversão\n\n\n👽 - Outros comanos")
        .setFooter("Help, ")
        .setThumbnail("https://media0.giphy.com/media/l2SpN0gAfO6yfw4A8/source.gif")
        .setTimestamp()
      msg.edit(embed_voltar)
      r.users.remove(message.author.id)
    })
  })
}