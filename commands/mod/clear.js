const Discord = require("discord.js");
const db = require("quick.db") 

module.exports = {
  name: "clear",
  aliases: ['limpar'],
  cooldown: 1000 * 2, 
  description: "Limpar o site.",
  category: "mod",
  usage: "<0/100>",

  async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "s." }
    
    let user = message.author.username
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.reply(
      "Você não tem permissão para limpar mensagens, Permissão necessária: MANAGE_MESSAGES"
    );
    
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 1 || deleteCount > 99)
    return message.reply(
        "Forneça um número de até **99 mensagens** a serem excluídas."
      );
 
  const fetched = await message.channel.messages.fetch({
    limit: deleteCount + 1
  });
  message.channel.bulkDelete(fetched); {
      await message.channel.send(`O chat teve ${deleteCount} mensagens deletadas por ${message.author}.`); 
  }
}};