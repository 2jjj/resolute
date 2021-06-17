
module.exports = {
  name: "clear",
  aliases: ['limpar'],
  cooldown: 1000 * 2, 
  description: "Limpar mensagens.",
  category: "mod",
  usage: "<0/99>",

  async run (client, message, args) {

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
      await message.channel.send(`🔨 **|** O chat teve ${deleteCount} mensagens deletadas por ${message.author}!`); 
  }
}};