const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "userinfo",
  aliases: ['ui'],
  cooldown: 1000 * 2, 
  description: "Obtenha informações de um usuário.",
  category: "mod",
  usage: "<id/@user>",

  async run (client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "s." }

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
                .addField("<:ybs_canal:851954875343962183> | User", `${member.user.tag}`, inline)
                .addField("<:ybs_usuarios:851954718724980757> | ID", member.user.id, inline)
                .addField("<:Resoluteinfo:844971535927083088> | Nickname", `${member.nickname !== null ? `✅ Apelido: ${member.nickname}` : "❌ Sem Apelidos"}`, true)
                .addField("<:ybs_bot:851955104345227294> | Bot", `${bot}`,inline, true)
                .addField("<:ybs_fixado2:851955202374107157>| Status", `${status[member.user.presence.status]}`, inline, true)
                .addField("<:ybs_fixado2:851955202374107157> | Jogando", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "❌ Sem atividade de jogo."}`,inline, true)
                .addField("<:ybs_duvida:851954411348820018> | Cargos", `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "❌ Sem cargos"}`, true)
                .addField("<:ybs_duvida:851954411348820018> | Entrou no discord em", member.user.createdAt)
                .setFooter(`Informação sobre ${member.user.username}`)
                .setTimestamp()
    
            message.channel.send(embed);

            message.delete();
    }
  }