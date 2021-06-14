const os = require('os');
const config = require("../config.json");

module.exports = async (client) => {
    //var numWorkers = require('os').cpus().length;

    const status = [  
        {name: `s.help • Shards Online: ${config.shards} || Desenvolvido pelo Spray#0007`, type: 'PLAYING'}, 
        {name: `Shards Online: ${config.shards} || Memória ultilizada ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`}, 
      ] 
      function Presence() { 
              const base = status[Math.floor(Math.random() * status.length)] 
              client.user.setActivity(base)
          } 
          Presence(); 
          setInterval(() => Presence(), 5000)          
}