const Discord = require("discord.js")
const db = require("quick.db")

module.exports = async (client, guild, message) => {
    
    let canal = db.get(`msg_del_${message.guild.id}`);
    if (!canal === null) return;
  
    if (message.author.bot) return;
  
    let author = message.author;
    let canal_2 = message.channel;
    let msg_del = message.content;
  
    let msg_embed = new MessageEmbed()
    .setTitle(`🗑 Mensagem excluída`)
    .setColor("RANDOM")
    .addFields(
      {
        name: `Autor da mensagem`,
        value: author,
        inline: false
      },
      {
        name: `Canal`,
        value: canal_2,
        inline: false
      },
      {
        name: `Mensagem`,
        value: `\`\`\`${msg_del}\`\`\``,
        inline: false
      }
    )
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL());
  
    client.channels.cache.get(canal).send(msg_embed)
}