const Discord = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: "leave",
    aliases: ['sair'],
    cooldown: 1000 * 2, 
    description: "Sair do canal de voz.",
    category: "musica",
    usage: "",

    async run (client, message, args) {
        
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) { prefix = "s." }

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
