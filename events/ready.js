const os = require('os');
const { shardid } = require('../commands/information/ping')

module.exports = async (client) => {
    var numWorkers = require('os').cpus().length;

    const status = [  
        {name: `s.help • Developed by Spray#0007 || Shards Online: ${numWorkers} || [${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB]`, type: 'PLAYING'}, 
        {name: `Shards Online: ${numWorkers} Memória ultilizada ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`}, 
      ] 
      function Presence() { 
              const base = status[Math.floor(Math.random() * status.length)] 
              client.user.setActivity(base)
          } 
          Presence(); 
          setInterval(() => Presence(), 5000)          
}