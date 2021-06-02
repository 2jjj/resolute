const { MessageEmbed } = require('discord.js')
const db = require("quick.db")

module.exports = {
  name: "sugestao",
  aliases: ['sugestion'],
  cooldown: 1000 * 2, 
  description: "sugestao",
  category: "outros",

  async run (client, message, args) {
    
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "s." }

        let channelID = message.mentions.channels.first()
        let theDescription = args.slice(1).join(" ")

        if(!channelID) return message.reply("Por favor, especifique um canal em que você deseja que a sugestão esteja! | `s.sugestao <canal>`")
        if(!theDescription) return message.reply("Por favor, especifique uma descrição / pergunta para a sugestão!")

        const embed = new MessageEmbed()
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