const Discord = require("discord.js")
const {ShardingManager} = require('discord.js');

module.exports = (client) => {
    const status = [  
        {name: `resolutebot.xyz | Shard 0`, type: 'LISTENING'}, 
        {name: `Online :) | Shard 0`, type: 'LISTENING'}, 
        {name: `Versão 1.2.5 | Shard 0`, type: 'LISTENING'}
      ] 
      function Presence() { 
              const base = status[Math.floor(Math.random() * status.length)] 
              client.user.setActivity(base)
          } 
          Presence(); 
          setInterval(() => Presence(), 6100)          
}