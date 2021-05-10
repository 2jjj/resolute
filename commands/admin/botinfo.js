const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });


  let embed = new Discord.MessageEmbed()
  .setTitle(" *Informações*")
  .setDescription("⠀")
  .setColor("RANDOM")
  .setThumbnail(avatar)
  .addField("<:developer:841128172299878401> | Desenvolvedor: **Spray.#0007**")
  .addField(`<a:BP_alerta_gif:841129076672299108> | Bot criado no dia: **11/10/2020**`)
  .addField(`<:iala:841129532773367808> | Estou em ${client.guilds.cache.size} servidores!, com ${client.users.cache.size} pessoas!`)
  .addField(`<:dy_girlHello:841125764690739203> | Versão discord.js: **12.5.1**`)
  .addField(`<a:pumpkinsmile:841130240352321557> | Estou na versão **1.2.5**`)
  .addField(`<:staff:835643948151996446> | Me adicione: *https://resolutebot.xyz*`)
  
  await message.channel.send(embed);
}

