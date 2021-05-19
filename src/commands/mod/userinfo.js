const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

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
                .addField("<:Information:844591555225714688> | User", `${member.user.tag}`, inline)
                .addField("<:Information:844591555225714688> | ID", member.user.id, inline)
                .addField("<:Information:844591555225714688> | Nickname", `${member.nickname !== null ? `✅ Apelido: ${member.nickname}` : "❌ Sem Apelidos"}`, true)
                .addField("<:Information:844591555225714688> | Bot", `${bot}`,inline, true)
                .addField("<:Information:844591555225714688> | Status", `${status[member.user.presence.status]}`, inline, true)
                .addField("<:Information:844591555225714688> | Jogando", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "❌ Sem atividade de jogo."}`,inline, true)
                .addField("<:Information:844591555225714688> | Cargos", `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "❌ Sem cargos"}`, true)
                .addField("<:Information:844591555225714688> | Entrou no discord em", member.user.createdAt)
                .setFooter(`<:Information:844591555225714688> | Informação sobre ${member.user.username}`)
                .setTimestamp()
    
            message.channel.send(embed);

            message.delete();
    }
