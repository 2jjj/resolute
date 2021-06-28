module.exports = {
  name: "sugestao",
  aliases: ['sugestion', 'sugerir'],
  cooldown: 1000 * 2, 
  description: "Faça uma sugestão para o seu servidor!",
  category: "outros",
  usage: "<#canal> <conteudo>",

  async run (client, message, args) {

        let channelID = message.mentions.channels.first()
        let theDescription = args.slice(1).join(" ")

        if(!channelID) {
          const Discord = require("discord.js");
          const db = require("quick.db");

          let prefix = db.get(`prefix_${message.guild.id}`)
          if (prefix === null) { prefix = "s." }

          const help = new Discord.MessageEmbed()
          .setTitle("Comando de sugestão")
          .setThumbnail(`${message.author.displayAvatarURL({dynamic: true})}`)
          .setDescription("Faça uma sugestão para o seu servidor!")
          .addField(`Forma de Utilização:`, ` \`${prefix}sugestao <#canal> <conteudo>\``)
          .addField(`Exemplo:`, ` \`${prefix}sugestao #sugestoes devo criar um novo canal?\``)
          .setFooter(`Comando executado por: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
          .setTimestamp();
          return message.channel.send(help);
        }

        if(!theDescription) return message.reply("<:1926blurplecross:856520144872407060> **|** Por favor, especifique uma descrição / pergunta para a sugestão!")

        const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle(`Nova sugestão por \`${message.author.username}#${message.author.discriminator}\``)
        .setDescription(`**${theDescription}**`)
        //.setFooter("Sugestão por: "+ message.author.username +'#'+ message.author.discriminator)

        let msgEmbed = await channelID.send(embed)
        await msgEmbed.react('✅') //👎👍
        await msgEmbed.react('❌')
        message.delete().catch(O_o => {});
    }
}