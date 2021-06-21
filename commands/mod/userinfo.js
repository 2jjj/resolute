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
        .setDescription(`
        **| User:** \`${member.user.tag}\`
        **| ID:** \`${member.user.id}\`
        **| Apelido:** \`${member.nickname !== null ? `✅ Apelido: ${member.nickname}` : "❌ Sem Apelidos"}\`
        **| Bot? ->** \`${bot}\`
        **| Status:** \`${status[member.user.presence.status]}\`
        **| Cargos:** ${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "❌ Sem cargos"}
        **| Dia em que entrou no discord:** \`${member.user.createdAt}\`
        `)
        .setFooter(`Informação sobre ${member.user.username}`)
        .setTimestamp()
    
      message.channel.send(embed);
    }
  }   