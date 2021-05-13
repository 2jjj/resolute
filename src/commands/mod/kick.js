const Discord = require ("discord.js")
const db = require("quick.db");

exports.run = (bot,message,args) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

  if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("você não tem permissão para executar o comando.");
  if(args.lenght === 0) return message.reply("use **s.kick <@Pessoa> <Motivo>** para kickar alguém.");
  let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!kickMember) return message.reply("use **s.kick <@Pessoa> <Motivo>** para kickar alguém.");
  let kickReason = args.join(" ").slice(22) || args.slice(1).join(" ");
  if(!kickReason){
    kickReason = "<:info:835206734225473546> » O motivo não foi especificado."
  }
  
  try {
    kickMember.kick({reason: kickReason})
    message.channel.send(`<:info:835206734225473546> > ${kickMember} **foi** \`Kickado\` **pelo** \`Motivo:\`**${kickReason}**`);
  } catch (error) {
    message.reply(`${error}`)
  }
}

