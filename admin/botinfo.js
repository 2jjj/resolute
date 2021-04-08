const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });


  let embed = new Discord.MessageEmbed()
  .setTitle("  **Informações do bot**")
  .setDescription("⠀")
  .setColor("RANDOM")
  .setThumbnail(avatar)
  .addField(" ❤️ Meu criador"," ▸ <@!798574984582791208>") 
  .addField(" 📅 Dia que o bot foi criado", " ▸ 20/12/2020")
  .addField(" 🛠️ Linguagem"," ▸ JavaScript")
  .addField(` 🕶️ Estou em ${client.guilds.cache.size} servidores!, com ${client.users.cache.size} pessoas!`)
  .addField(" 🗜️ Meu prefixo"," ▸ s.")

  await message.channel.send(embed);
}

