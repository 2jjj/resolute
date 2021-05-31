const Discord = require("discord.js");

module.exports = {
    name: "leave",
    aliases: ['sair'],
    cooldown: 1000 * 2, 
    description: "sair do canal de voz",
    category: "musica",
  
    async run (client, message, args) {
        message.client.queue.get(message.guild.id)
        const tatakae = message.guild.me.voice.channel;
          const channel = message.member.voice.channel;
          if (!channel) return message.channel.send('Você deve estar em um **canal de voz!**');
          
          if (!tatakae) return message.channel.send('Eu preciso estar em um **canal de voz!**');
          const kk = message.guild.me.voice.channel.leave();
      
             
             const spr4y = new Discord.MessageEmbed()
             .setColor("#F781BE")
             .setDescription(`${message.author} me desconectou 🎵`);
            await message.channel.send(spr4y);
             await kk
             await message.client.queue.delete(message.guild.id);
    }

} 
