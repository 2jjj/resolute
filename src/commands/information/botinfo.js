const Discord = require("discord.js");
const config = require("../../config/config.json")
const os = require('os')

module.exports = {
  name: "botinfo",
  aliases: ['sobre', 'bot', 'aboutbot'],
  cooldown: 1000 * 2, 
  description: "Minhas informações.",
  category: "info",
  usage: "",
  example: "",
  args: false,

  async run (client, message, args) {
    const promises = [ client.shard.fetchClientValues('guilds.cache.size'), 
    client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')];
    Promise.all(promises) 	
    .then(async results => { 	
        const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0); 	
        const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);   
        //**//
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
        let { version } = require("discord.js");
        //**//
        let embed = new Discord.MessageEmbed()
        .setTitle("**Minhas informações!**")
        .setColor("RANDOM")
        .setThumbnail(avatar)
        .setDescription(`Me chamo Resolute, fui criado no dia **11 de outubro de 2020** pelo **${config.spray}** na linguagem **Javascript** com o discord.js\n\n**Algumas informações:
        <:early_developer_badge:854716150076538901> **|** Developer: ${config.spray}
        <:pontin:852197383974551582> **|** Estou em ${totalGuilds} servidores.
        <:pontin:852197383974551582> **|** ${totalMembers} de usuários.
        <:cpu:854137097521987624> **|** Shard: ${message.guild.shard.id}/${config.shards}
        <:cpu:854137097521987624> **|** Shards: ${config.shards}
        <:memoryram:854135087037153280> **|** Memória ultilizada: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB
        <:ybs_bot:851955104345227294> **|** [Me adicione!](https://invite.resolutebot.xyz)
        **`)
        await message.channel.send(embed);
    })
}}