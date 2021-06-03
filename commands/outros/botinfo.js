const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "botinfo",
  aliases: ['sobre', 'bot', 'aboutbot'],
  cooldown: 1000 * 2, 
  description: "Minhas informações.",
  category: "outros",
  usage: "",

  async run (client, message, args) {
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "s." }
    
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

  let { version } = require("discord.js");
  var numWorkers = require('os').cpus().length;

  let embed = new Discord.MessageEmbed()
  .setTitle("**Resolute - Botinfo**")
  .setColor("RANDOM")
  .setThumbnail(avatar)
	.addFields(
		{ name: 'ﾠ', value: '<:developer:843586491434401792> | **Desenvolvedor:** <@836345581424738354>, <@798574984582791208>' },
		{ name: 'ﾠ', value: `<:information:843542771814236170> | **Bot criado no dia:** **11/10/2020**`, inline: false },
		{ name: 'ﾠ', value: `<:Resoluteinfo:844971535927083088> | **Estou em ${client.guilds.cache.size} servidores!**, **com ${client.users.cache.size} pessoas!**`, inline: false },
    { name: 'ﾠ', value: `<:3434_Discord_js_logo:845779460899733553> | **Versão discord.js:** **${version}**`, inline: false },
    { name: 'ﾠ', value: `<:node:845780252940959744> | **Versão Node.JS:** **${process.version}**`, inline: false },
    { name: 'ﾠ', value: `<:N3UP_Servers:845357935155478548> | **Estou na versão** **0.0.6**`, inline: false },
		{ name: 'ﾠ', value: `<:tj_add_1:845780583165722625> | [Me adicione!](https://resolutebot.xyz)`, inline: false },
	)
  await message.channel.send(embed);
}
}