const Discord = require("discord.js")
var numWorkers = require('os').cpus().length;

module.exports = async (client) => {

    const status = [  
        {name: `s.help • ${client.guilds.cache.size} guilds.`, type: 'PLAYING'}, 
      ] 
      function Presence() { 
              const base = status[Math.floor(Math.random() * status.length)] 
              client.user.setActivity(base)
          } 
          Presence(); 
          setInterval(() => Presence(), 6100)          
}