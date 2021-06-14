const os = require('os');
const config = require("../config.json");

module.exports = async (client) => {
    //var numWorkers = require('os').cpus().length;
    const guilds = await client.shard.broadcastEval("this.guilds.cache.size")
    const botGuilds = guilds.reduce((prev, val) => prev + val)

    const status = [  
        {name: `s.help | ${botGuilds} guilds | Shards: ${config.shards}`, type: 'PLAYING'}, 
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