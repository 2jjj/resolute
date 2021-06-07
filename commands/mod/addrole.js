const Discord = require("discord.js");

module.exports = {
    name: "addrole",
    aliases: ['adicionarcargo'],
    cooldown: 1000 * 2, 
    description: "Adicionar um cargo para alguém",
    category: "mod",
    usage: "@user @cargo",
  
  async run (client, message, args) {

  //!addrole @andrew Dog Person
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sem permissões!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Não consegui achar o usuário!");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Especifique o cargo!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Não consegui achar o cargo!");

  if(rMember.roles.has(gRole.id)) return message.reply("Ele já possui este cargo!");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Parabéns, você recebeu o cargo ${gRole.name}`)
  }catch(e){
    message.channel.send(`Parabéns para o <@${rMember.id}>, Ele ganhou o cargo ${gRole.name}. Eu tentei enviar mensagem para ele mas a DM dele estava bloqueada.`)
  }
}}