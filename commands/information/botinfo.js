const Discord = require("discord.js");

module.exports = {
  name: "botinfo",
  aliases: ['sobre', 'bot', 'aboutbot'],
  cooldown: 1000 * 2, 
  description: "Minhas informações.",
  category: "info",
  usage: "",

  async run (client, message, args) {
    
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
    let { version } = require("discord.js");
    const guilds = await client.shard.broadcastEval("this.guilds.cache.size")
    const botGuilds = guilds.reduce((prev, val) => prev + val)

    let embed = new Discord.MessageEmbed()
    .setTitle("**Resolute - Botinfo**")
    .setColor("RANDOM")
    .setThumbnail(avatar)

    await message.channel.send(embed);
}
}