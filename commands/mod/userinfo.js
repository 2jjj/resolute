const Discord = require("discord.js");

module.exports = {
  name: "userinfo",
  aliases: ['ui'],
  cooldown: 1000 * 2, 
  description: "Obtenha informações de um usuário.",
  category: "mod",
  usage: "<id/@user>",

  async run (client, message, args) {

    let inline = true
    let resence = true
    const status = {
        online: "✅ Online",
        idle: "🌙 Ausente",
        dnd: "❌ Não perturbar",
        offline: "👾 Invisivel"
      }
        
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let target = message.mentions.users.first() || message.author

    if (member.user.bot === true) {
        bot = "✅ Sim";
      } else {
        bot = "❌ Não";
      }

            let embed = new Discord.MessageEmbed()
                //.setAuthor(member.user.username)
                .setThumbnail((target.displayAvatarURL))
                .setColor("#00ff00")
                .addField("<a:SETA:852194614927818812> **|** User", `${member.user.tag}`, inline)
                .addField("<a:SETA:852194614927818812> **|** ID", member.user.id, inline)
                .addField("<a:SETA:852194614927818812> **|** Nickname", `${member.nickname !== null ? `✅ Apelido: ${member.nickname}` : "❌ Sem Apelidos"}`, true)
                .addField("<a:SETA:852194614927818812> **|** Bot", `${bot}`,inline, true)
                .addField("<a:SETA:852194614927818812> **|** Status", `${status[member.user.presence.status]}`, inline, true)
                .addField("<a:SETA:852194614927818812> **|** Jogando", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "❌ Sem atividade de jogo."}`,inline, true)
                .addField("<a:SETA:852194614927818812> **|** Cargos", `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "❌ Sem cargos"}`, true)
                .addField("<a:SETA:852194614927818812> **|** Entrou no discord em", member.user.createdAt)
                .setFooter(`Informação sobre ${member.user.username}`)
                .setTimestamp()
    
            message.channel.send(embed);

            message.delete();
    }
  }   