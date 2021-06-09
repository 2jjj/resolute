const Discord = require("discord.js"); 
const db = require("quick.db");

module.exports = {
  name: "serverinfo",
  aliases: ['serverinformation'],
  cooldown: 1000 * 2, 
  description: "Informações do servidor.",
  category: "mod",
  usage: "",

  async run (client, message, args) {
 
    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) { prefix = "s." }

    let serverembed = new Discord.MessageEmbed() 
    .setColor("#6400b6")
    .setTitle(message.guild.name + ` Server Info`)
    .addField("<:ybs_duvida:851954411348820018>  » Nome", message.guild.name, )
    .addField("<:ybs_config:851954339735666729> » ID do servidor", message.guild.id, )
    .addField(`<:ybs_mencao:851954512540991490> » Dono`, `<@${message.guild.ownerID}>`)
    .addField(`<:ybs_config:851954339735666729> » ID do dono`, message.guild.ownerID)
    .addField('<:ybs_duvida:851954411348820018> » Server Criado em', message.guild.createdAt, true)
    .addField(`<:ybs_duvida:851954411348820018>» Proteção de verificação`, message.guild.verificationLevel, true)
    .addField('<:ybs_duvida:851954411348820018> » Membros', `${message.guild.members.cache.filter(member => member.user.bot).size} Bots | ${(message.guild.memberCount) - (message.guild.members.cache.filter(member => member.user.bot).size)} Humanos | ${message.guild.memberCount} Total de Membros | ${Math.round((message.guild.members.cache.filter(member => member.user.bot).size / message.guild.memberCount) * 100)}% Bots | ${Math.round((((message.guild.memberCount) - (message.guild.members.cache.filter(member => member.user.bot).size)) / message.guild.memberCount) * 100)}% Humanos`, true)
    .addField('<:ybs_duvida:851954411348820018> » Canais', `${message.guild.channels.cache.filter(chan => chan.type === 'voice').size} Chats de Voz | ${message.guild.channels.cache.filter(chan => chan.type === 'text').size} Canais de Texto | ${message.guild.channels.cache.filter(chan => chan.type === 'category').size} Categorias | ${Math.round((message.guild.channels.cache.filter(chan => chan.type === 'voice').size / message.guild.channels.cache.size) * 100)}% Chats de Voz | ${Math.round((message.guild.channels.cache.filter(chan => chan.type === 'text').size / message.guild.channels.cache.size) * 100)}% Canais de Texto | ${Math.round((message.guild.channels.cache.filter(chan => chan.type === 'category').size / message.guild.channels.cache.size) * 100)}% Categorias`, true)
    .addField("<:ybs_duvida:851954411348820018> » Você Entrou", message.member.joinedAt)
    .setFooter(` • Autor ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
 
    message.channel.send(serverembed);
 
   message.delete();
 }
}