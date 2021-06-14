const os = require('os');
const config = require("../config.json");

module.exports = async (client) => {
    //var numWorkers = require('os').cpus().length;
    const guilds = await client.shard.broadcastEval("this.guilds.cache.size")
    const botGuilds = guilds.reduce((prev, val) => prev + val)
    //const users = await client.shard.broadcastEval("this.users.cache.size");
    //const botUsers = users.reduce((prev, val) => prev + val)

    //console.log(botUsers)
   //console.log(botGuilds)
   console.log(`${client.user.username} ✅`)

   const arrayOfStatus = [
       `${botGuilds} guilds. | Shards: ${config.shards}`,
       `70K+ users. | Shards: ${config.shards}`,
       `Developer: Spray#0007`,
       `s.help`
   ];

   let index= 0;
   setInterval(() => {
       if(index === arrayOfStatus.length) index = 0;
       const status = arrayOfStatus[index];
       console.log(`Streaming ${status}`);
       client.user.setActivity(`${status}`, {
        type: "PLAYING",
        url: "https://www.twitch.tv/blue666opislive"
    })
    index++;
   }, 10000);
}