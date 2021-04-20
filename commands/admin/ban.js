const Discord = require ("discord.js")

exports.run = (bot,message,args) => {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("você não tem permissão para executar o comando.");
  if(args.lenght === 0) return message.reply("use **s.ban <@Pessoa> <Motivo>** para banir alguém.");
  let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!banMember) return message.reply("use **s.ban <@Pessoa> <Motivo>** para banir alguém.");
  let banReason = args.join(" ").slice(22) || args.slice(1).join(" ");
  if(!banReason){
    banReason = "O motivo não foi especificado."
  }
  
  try {
    banMember.ban({reason: banReason})
    message.channel.send(`:hammer: ${banMember} **foi** \`Banido\` **pelo** \`Motivo:\`**${banReason}**`);
  } catch (error) {
    message.reply(`${error}`)
  }

message.channel.send(`Você foi banido do servidor ${message.guild.name} pelo motivo: ${banReason}`)
}
