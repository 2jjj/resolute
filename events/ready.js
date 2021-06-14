const os = require('os');

module.exports = async (client) => {
    //var numWorkers = require('os').cpus().length;

    var guilds = client.shard.fetchClientValues('guilds.cache.size').then(results => {console.log(`${results.reduce((acc, guildCount) => acc + guildCount, 0)} total guilds`);})
    var users = client.shard.fetchClientValues('users.cache.size')

    const status = [  
        {name: `s.help • Developed by Spray#0007 || [${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB]`, type: 'PLAYING'}, 
        {name: `Memória ultilizada ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`}, 
      ] 
      function Presence() { 
              const base = status[Math.floor(Math.random() * status.length)] 
              client.user.setActivity(base)
          } 
          Presence(); 
          setInterval(() => Presence(), 5000)          
}