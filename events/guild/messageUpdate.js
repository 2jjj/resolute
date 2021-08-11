const Discord = require("discord.js")
const db = require("quick.db")

module.exports = async (client, message, oldMessage) => {

  try {
    var canal = db.get(`msg_edit_${message.guild.id}`);
    if (!canal === null) return;
  } catch (e) {}

  //if (message.author.bot) return;
  
  let author = message.author;
  let canal_2 = message.channel;
  let msg_antiga = message.content;
  let msg_editada = oldMessage.content;

  let embed = new Discord.MessageEmbed()
    .setTitle(`📝 Mensagem editada`)
    .setColor("RANDOM")
    .addFields(
      {
        name: `Autor da mensagem`,
        value: `> ${author}`,
        inline: false
      }, 
      {
        name: `Canal`,
        value: `> ${canal_2}`,
        inline: false
      }, 
      {
        name: `Mensagem antiga`,
        value: `\`\`\`${msg_antiga}\`\`\``,
        inline: false
      }, 
      {
        name: `Mensagem editada`,
        value: `\`\`\`${msg_editada}\`\`\``,
        inline: false
      }
    )

    /*.setThumbnail(message.author.displayAvatarURL({
      dynamic: true
    }))*/
    .setTimestamp()
    //.setFooter(message.guild.name, message.guild.iconURL());

  try {
    client.channels.cache.get(canal).send(embed)
  } catch (e) {}

}