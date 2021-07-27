const Discord = require("discord.js");
const config = require("../../../config/config.json")
const os = require('os')

module.exports = {
  name: "botinfo",
  aliases: ['sobre', 'bot', 'aboutbot'],
  cooldown: 1000 * 2, 
  description: "Minhas informações.",
  category: "info",
  usage: "",
  example: "",
  permissoes: [],
  args: false,

  async run (client, message, args) {
    const promises = [ client.shard.fetchClientValues('guilds.cache.size'), 
    client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')];
    Promise.all(promises) 	
    .then(async results => { 	
        const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0); 	
        const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);   
        
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
        let { version } = require("discord.js");

        let embed = new Discord.MessageEmbed()
        .setTitle("**Prazer, meu nome é Resolute!**")
        .setColor("RANDOM")
        .setThumbnail(avatar)
        .setDescription(`
        **Informações**
        > 👑 **|** Criador: ${config.spray}
        > <:early_developer_badge:854716150076538901> **|** Desenvolvedor: ${config.spray}
        > <:config:856894534197313536> **|** Versão: 2.5.7
        > <:djs:868314375751102484> **|** Versão Discord.js: ${version}
        
        **Estatísticas**
        > <:pontin:852197383974551582> **|** Estou em ${totalGuilds} servidores.
        > <:pontin:852197383974551582> **|** ${totalMembers} usuários.
        > <:cpu:854137097521987624> **|** Shard: ${message.guild.shard.id}/${config.shards}

        **Links úteis :**
        > 🤖 **|** [Me adicione!](https://www.resolutebot.xyz/add)
        > :small_blue_diamond: **|** [Website](https://www.resolutebot.xyz)
        > :small_blue_diamond: **|** [Dashboard](https://painel.resolutebot.xyz)
        `)
        await message.channel.send(embed);
    })
}}