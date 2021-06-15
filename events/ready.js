const os = require('os');
const config = require("../config.json");

module.exports = async (client) => {

    const promises = [ client.shard.fetchClientValues('guilds.cache.size'), 
    client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')];
    Promise.all(promises) 	
    .then(async results => { 	
        const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0); 	
        const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
        
        const arrayOfStatus = [
        `s.help | ${totalMembers} users`,
        `${totalGuilds} guilds & ${totalMembers} users`,
        ];

        let index= 0;
        setInterval(() => {
            if(index === arrayOfStatus.length) index = 0;
            const status = arrayOfStatus[index];
            //console.log(`Streaming ${status}`);
            client.user.setActivity(`${status}`, {
            type: "LISTENING",
        })
        index++;
        }, 10000);
        })

        console.log(`${client.user.username} ✅`)
}