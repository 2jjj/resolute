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
    .setTitle("**Minhas informações!**")
    .setColor("RANDOM")
    .setThumbnail(avatar)
    .setDescription(`Me chamo Resolute, fui criado no dia **11 de outubro de 2020** pelo **Spray#0007** na linguagem **Javascript** com o discord.js\nEstou em ${botGuilds} servidores!\n\n**Algumas informações:
    dsa
    da
    da
    da
    **`)
    await message.channel.send(embed);
}
}