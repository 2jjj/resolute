const config = require("../config.json")

module.exports = async (client) => {

    const promises = [ client.shard.fetchClientValues('guilds.cache.size'), 
    client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')];
    Promise.all(promises) 	
    .then(async results => { 	
        const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0); 	
        const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);

        const status = [  
            {name: `s.help • ${totalGuilds} guilds & ${totalMembers} users.`, type: 'PLAYING'}, 
            {name: `Atualização diariamente.`, type: 'PLAYING'}, 
          ] 
          function Presence() { 
                  const base = status[Math.floor(Math.random() * status.length)] 
                  client.user.setActivity(base)
              } 
              Presence(); 
              setInterval(() => Presence(), 5000)         
            })
        console.log(`${client.user.username} ✅`)
}