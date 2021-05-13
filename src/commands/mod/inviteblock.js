const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  
  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

client.on("message", async message => {
  const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
  if (regex.exec(message.content)) {
    await message.delete({timeout: 1000});
      await message.channel.send(
        `<:info:835206734225473546> » ${message.author} **Você não pode postar link de outros servidores aqui!**`
      );
  }
});
}