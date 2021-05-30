const Discord = require("discord.js")
var numWorkers = require('os').cpus().length;

module.exports = async (client) => {
    const status = [  
        {name: `• Dev: Spray#0007 | resolutebot.xyz `, type: 'LISTENING'}, 
        {name: `• ${client.guilds.cache.size} guilds | Versão 0.0.6 `, type: 'LISTENING'}
      ] 
      function Presence() { 
              const base = status[Math.floor(Math.random() * status.length)] 
              client.user.setActivity(base)
          } 
          Presence(); 
          setInterval(() => Presence(), 6100)          
}