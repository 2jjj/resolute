const Discord = require("discord.js");
const config = require("../../../config/config.json")
const os = require('os')

module.exports = {
  name: "botinfo",
  aliases: ['sobre', 'bot', 'aboutbot', 'bi'],
  cooldown: 1000 * 2, 
  description: "Minhas informações.",
  category: "bot",
  usage: "",
  example: "",
  permissoes: [],
  args: false,

  async run(client, message, args, cmduser, text, prefix, player) {

	
        const totalGuilds = client.guilds.cache.size
        const totalMembers = client.users.cache.size

        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
        let { version } = require("discord.js");
        let secs = Math.floor(client.uptime % 60);
        let days = Math.floor((client.uptime % 31536000) / 86400);
        let hours = Math.floor((client.uptime / 3600) % 24);
        let mins = Math.floor((client.uptime / 60) % 60);

        let embed = new Discord.MessageEmbed()
        .setTitle("**Outras informações**")
        .setColor("RANDOM")
        .setThumbnail(avatar)
        .setDescription(`
        > <:early_developer_badge:854716150076538901> **|** Desenvolvedor: ${config.spray}
        > <:1520blurplesettings:856520144851435540> **|** Versão: 3.0.5
        > <:1598blurplesupport:856520144599777291> **|** Prefixo: ${prefix}
        > <:djs:868314375751102484> **|** Versão Discord.Js: ${version}
        > <:node:845780252940959744> **|** Versão do Node.Js: ${process.version}

        **Estatísticas**
        > 🤔 **|** Uptime ${hours}h ${mins}m
        > <:pontin:852197383974551582> **|** Estou em ${totalGuilds} servidores com o total de ${totalMembers} usuários.
        > <:cpu:854137097521987624> **|** Shard: ${message.guild.shard.id}/${config.shards}

        **Links úteis :**
        > <:1113blurpleplus:856520144797040690> **|** [Me adicione!](https://www.resolutebot.xyz/add)
        > <:8512blurplelink:856520144843046922> **|** [Website](https://www.resolutebot.xyz)
        `)
        await message.reply({ embeds: [embed] });
    }
}