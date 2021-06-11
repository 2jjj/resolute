module.exports = async (client) => {
    //var numWorkers = require('os').cpus().length;

    const status = [  
        {name: `s.help • ${client.guilds.cache.size} guilds & ${client.users.cache.size} users • Developed by Spray#0007`, type: 'PLAYING'}, 
      ] 
      function Presence() { 
              const base = status[Math.floor(Math.random() * status.length)] 
              client.user.setActivity(base)
          } 
          Presence(); 
          setInterval(() => Presence(), 5000)          
}