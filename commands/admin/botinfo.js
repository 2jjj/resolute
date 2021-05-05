const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });


  let embed = new Discord.MessageEmbed()
  .setTitle("  **Resolute ~ Informações**")
  .setDescription("⠀")
  .setColor("RANDOM")
  .setThumbnail(avatar)
  .addField("<:5579developerbadge:837769393378820147> | Meu criador"," ▸ <@!836345581424738354>") 
  .addField("<:9189arrowblue:837773741391347712> Dia que o bot foi criado", " ▸ 11/10/2020")
  .addField("<:9136_js:837774154827956264> | Linguagem"," ▸ JavaScript")
  .addField(`<:6554connection:837769393257185340> | Estou em ${client.guilds.cache.size} servidores!, com ${client.users.cache.size} pessoas!`)
  .addField("<:3899britishtea:837773943145889822>  Meu prefixo"," ▸ s.")

  await message.channel.send(embed);
}

