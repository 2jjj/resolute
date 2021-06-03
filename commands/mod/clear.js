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
      "<:bravinha:841126251741970452> | Você não tem permissão para limpar mensagens, Permissão necessária: MANAGE_MESSAGES"
    );
    
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 1 || deleteCount > 99)
    return message.reply(
        "<:Aviso:843862131720192001> | Forneça um número de até **99 mensagens** a serem excluídas."
      );
 
  const fetched = await message.channel.messages.fetch({
    limit: deleteCount + 1
  });
  message.channel.bulkDelete(fetched); {
      let embed = new Discord.MessageEmbed()
      .setDescription(`**<:2637settings:843854352867262504> O chat foi Limpo por ${message.author}**`)
      .setColor('BLUE')
      .setTitle('`Resolute - Clear`')
      .setFooter(`• Autor: ${message.author.username}`, message.author.displayAvatarURL({format: "png"}));
      await message.channel.send(embed); 
  }
}};