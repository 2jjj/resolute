const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.reply(
      "<:info:835206734225473546> | Você não tem a permissão de `Gerenciar Mensagens` para usar esse comando"
    );
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 1 || deleteCount > 200)
    return message.reply(
      "<:info:835206734225473546> | Forneça um número de até **200 mensagens** a serem excluídas"
    );

  const amountDelete = parseInt(args[0]);
  message.channel.bulkDelete(amountDelete);
  message.channel
    .send(`**<:info:835206734225473546> | ${args[0]} Mensagens limpas nesse chat!**`).then(msg => msg.delete({timeout: 5000}))
    .catch(error => 
      console.log(`<:info:835206734225473546> | Não foi possível deletar mensagens devido a: ${error}`)
    );
};