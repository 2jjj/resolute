const os = require('os');
const config = require("../config.json");
require("../commands/information/shards")

module.exports = async (client, botGuilds) => {
    //var numWorkers = require('os').cpus().length;
    const status = [  
        {name: `s.help | 98 guilds | Shards: ${config.shards}`, type: 'PLAYING'}, 
        {name: `Memória ultilizada ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB || Shards Online: ${config.shards}`},
        {name: `Dev: Spray#0007 | [${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)}] | [${config.shards}]`},
        {name: `Vamos transformar está plataforma! | [${config.shards}]`},
    ] 
      function Presence() { 
              const base = status[Math.floor(Math.random() * status.length)] 
              client.user.setActivity(base)
          } 
          Presence(); 
          setInterval(() => Presence(), 5000)          
}