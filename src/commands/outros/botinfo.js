const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  
  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

  let { version } = require("discord.js");

  let embed = new Discord.MessageEmbed()
  .setTitle(" *Informações*")
  .setColor("RANDOM")
  .setThumbnail(avatar)
	.addFields(
		{ name: 'ﾠ', value: '<:developer:843586491434401792> | Desenvolvedor: <@836345581424738354>, <@798574984582791208>' },
		{ name: 'ﾠ', value: `<a:BP_alerta_gif:841129076672299108> | Bot criado no dia: **11/10/2020**`, inline: false },
		{ name: 'ﾠ', value: `<:Resoluteinfo:844971535927083088> | Estou em ${client.guilds.cache.size} servidores!, com ${client.users.cache.size} pessoas!`, inline: false },
    { name: 'ﾠ', value: `<:dy_girlHello:841125764690739203> | Versão discord.js: **${version}**`, inline: false },
    { name: 'ﾠ', value: `<a:pumpkinsmile:841130240352321557> | Estou na versão **0.0.5**`, inline: false },
		{ name: 'ﾠ', value: `<:staff:835643948151996446> | Me adicione: *https://resolutebot.xyz*`, inline: false },
	)
  await message.channel.send(embed);
}

