const Discord = require ("discord.js")

exports.run = (bot,message,args) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

  
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("<:info:835206734225473546> » Você não tem permissão para executar o comando.");
  if(args.lenght === 0) return message.reply("<:info:835206734225473546> » Use **s.ban <@Pessoa> <Motivo>** para banir alguém.");
  let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!banMember) return message.reply("<:info:835206734225473546> » Use **s.ban <@Pessoa> <Motivo>** para banir alguém.");
  let banReason = args.join(" ").slice(22) || args.slice(1).join(" ");
  if(!banReason){
    banReason = "<:info:835206734225473546> » O motivo não foi especificado."
  }
  
  try {
    banMember.ban({reason: banReason})
    message.channel.send(`:hammer: ${banMember} **foi** \`Banido\` **pelo** \`Motivo:\`**${banReason}**`);
  } catch (error) {
    message.reply(`${error}`)
  }

message.channel.send(`<:info:835206734225473546> » Você foi banido do servidor ${message.guild.name} pelo motivo: ${banReason}`)
}

