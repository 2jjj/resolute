const Discord = require("discord.js")

module.exports = async (client) => {

    const status = [  
        {name: `👾 resolutebot.xyz | SHARD 0`, type: 'LISTENING'}, 
        {name: `❤️ Novo comando -> s.setprefix | SHARD 0`, type: 'LISTENING'}, 
        {name: `🔫 Versão 1.2.5 | SHARD 0`, type: 'LISTENING'}
      ] 
      function Presence() { 
              const base = status[Math.floor(Math.random() * status.length)] 
              client.user.setActivity(base)
          } 
          Presence(); 
          setInterval(() => Presence(), 6100)          
}