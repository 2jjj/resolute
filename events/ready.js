const os = require('os');
const config = require("../config.json");

module.exports = async (client) => {
    //var numWorkers = require('os').cpus().length;
    const guilds = await client.shard.broadcastEval("this.guilds.cache.size")
    
    console.log(`Fui iniciado com ${guilds}`)

    const status = [  
        {name: `s.help | Desenvolvido pelo Spray#0007 || Shards Online: ${config.shards}`, type: 'PLAYING'}, 
        {name: `Shards Online: ${config.shards} || Memória ultilizada ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`}, 
        {name: `Vamos transformar está plataforma! || Shards Online: ${config.shards}`},
        {name: `Me adicione: invite.resolutebot.xyz || Shards Online: ${config.shards}`},
        {name: `Memória ultilizada ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB || Shards Online: ${config.shards}`},      
    ] 
      function Presence() { 
              const base = status[Math.floor(Math.random() * status.length)] 
              client.user.setActivity(base)
          } 
          Presence(); 
          setInterval(() => Presence(), 5000)          
}