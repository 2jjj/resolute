const Discord = require("discord.js")

module.exports = async (client) => {
    var numWorkers = require('os').cpus().length;

    const status = [  
        {name: `s.help • ${client.guilds.cache.size} guilds. | Clusters [${numWorkers}]`, type: 'PLAYING'}, 
      ] 
      function Presence() { 
              const base = status[Math.floor(Math.random() * status.length)] 
              client.user.setActivity(base)
          } 
          Presence(); 
          setInterval(() => Presence(), 6100)          
}