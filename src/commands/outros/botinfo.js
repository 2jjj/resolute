const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  
  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });


  let embed = new Discord.MessageEmbed()
  .setTitle(" *Informações*")
  .setColor("RANDOM")
  .setThumbnail(avatar)
	.addFields(
		{ name: 'ﾠ', value: '<:developer:841128172299878401> | Desenvolvedor: **Spray.#0007**' },
		{ name: 'ﾠ', value: `<a:BP_alerta_gif:841129076672299108> | Bot criado no dia: **11/10/2020**`, inline: false },
		{ name: 'ﾠ', value: `<a:__:835643988022263879> | Estou em ${client.guilds.cache.size} servidores!, com ${client.users.cache.size} pessoas!`, inline: false },
    { name: 'ﾠ', value: `<:dy_girlHello:841125764690739203> | Versão discord.js: **12.5.1**`, inline: false },
    { name: 'ﾠ', value: `<a:pumpkinsmile:841130240352321557> | Estou na versão **1.3.0 (BETA)**`, inline: false },
		{ name: 'ﾠ', value: `<:staff:835643948151996446> | Me adicione: *https://resolutebot.xyz*`, inline: false },
	)

  await message.channel.send(embed);
}

