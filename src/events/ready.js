const Discord = require("discord.js")

module.exports = async (client) => {

    const status = [  
        {name: `❤️ Meu criador - Spray#0007`, type: 'LISTENING'}, 
        {name: `👾 resolutebot.xyz`, type: 'LISTENING'}, 
        {name: `❤️ ${client.guilds.cache.size} guilds `, type: 'LISTENING'}, 
        {name: `🔫 Versão 1.3.2 (Beta)`, type: 'LISTENING'}
      ] 
      function Presence() { 
              const base = status[Math.floor(Math.random() * status.length)] 
              client.user.setActivity(base)
          } 
          Presence(); 
          setInterval(() => Presence(), 6100)          
}