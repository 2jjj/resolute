const Discord = require("discord.js");

module.exports = {
  name: "ajuda2",
  aliases: ['help2'],
  cooldown: 1000 * 2, 
  description: "Minhas informações.",
  category: "info",
  usage: "",

  async run (client, message, args) {
    let embed = new Discord.MessageEmbed()
    .setTitle(`Painel de comandos`)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`Veja meus comandos:

\n🔗 Utilidade \n⚙ Moderação \n🤣 Diversão \n👑 Outros
⠀`)
    .setFooter(`${message.author.tag}`)
    .setColor("YELLOW")    
    message.channel.send(`${message.author}`, embed).then(msg => {
      msg.react("◀️")
      msg.react("🔗")
      msg.react("⚙")
      msg.react("🤣")
      msg.react("👑")

      let filtro0 = (r, u) => r.emoji.name === '◀️' && u.id === message.author.id;
      let filtro1 = (r, u) => r.emoji.name === '🔗' && u.id === message.author.id;
      let filtro2 = (r, u) => r.emoji.name === '⚙' && u.id === message.author.id;
      let filtro3 = (r, u) => r.emoji.name === '🤣' && u.id === message.author.id;
      let filtro4 = (r, u) => r.emoji.name === '👑' && u.id === message.author.id;
      

      let coletor0 = msg.createReactionCollector(filtro0);
      let coletor = msg.createReactionCollector(filtro1);
      let coletor2 = msg.createReactionCollector(filtro2);
      let coletor3 = msg.createReactionCollector(filtro3);
      let coletor4 = msg.createReactionCollector(filtro4);

      coletor0.on("collect", c => { //embed do painel inicial (editada)

        let ferinha = new Discord.MessageEmbed()
      .setTitle(`Painel de comandos`)
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(`Veja meus comandos:

\n🔗 Utilidade \n⚙ Moderação \n🤣 Diversão \n👑 Outros
⠀`)
      .setFooter(`${message.author.tag}`)
      .setColor("YELLOW")   
        
     
        msg.edit(`${message.author}`, ferinha)
      })


      coletor.on("collect", c => { //embed do painel de utilidade (editada)

        let fera = new Discord.MessageEmbed()
        .setTitle(`🔗 Utilidade 🔗`)
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter(`${message.author.tag}`)
        .setDescription(`Os Meus Comandos de Ultilidade São
        Say
        Avatar
        Embed
        Ping
        E Outros Futuros \n⠀`)
        .setColor("#401199")
        

        msg.edit(`${message.author}`, fera)
      })

      coletor2.on("collect", c => { //embed do painel de moderação (editada)

        let fera = new Discord.MessageEmbed()
        .setTitle(`⚙ Moderação ⚙`)
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter(`${message.author.tag}`)
        .setDescription(`Nesta Parte Mostrarei os Comandos de Moderação
        Ban
        UnBan
        E Outros Futuros \n⠀`)
        .setColor("#401199")
        

        msg.edit(`${message.author}`, fera)
      })

      coletor3.on("collect", c => { //embed do painel de diversão (editada)

        let ferinha = new Discord.MessageEmbed()
        .setTitle(`🤣 Diversão 🤣`)
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter(`${message.author.tag}`)
        .setDescription(`Vocês Acham que Eu Sou Séria? Se Sim, Porque Ainda Não Olhou os Comandos de Diversão, Entre eles Tem
        Beijar
        Hug
        Tapa
        E Outros \n⠀`)
        .setColor("GREEN")

        msg.edit(`${message.author}`, ferinha)
      })

      coletor4.on("collect", c => { //embed de outros cmds (editada)

        let ferauwu = new Discord.MessageEmbed()
        .setTitle(`👑 Outros 👑`)
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter(`${message.author.tag}`)
        .setDescription(`Não Tenho Outros Comandos ,_, \n⠀`)
        .setColor("BLUE")

        msg.edit(`${message.author}`, ferauwu)
      })
    })
  }
}