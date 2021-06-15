module.exports = async (client, guild) => {
    const guildSchema = require('../mongoDB/guild.js');
        
    guildSchema.findOneAndDelete({ Guild: guild.id }, async (err, data) => {
        
    if(err) return console.log(err)
    })
        
    let icon = (!guild.iconURL()?'https://cdn.discordapp.com/avatars/764919941538775050/672afa4f2a4ac5fee624580229a2efbd.png?size=1024':guild.iconURL())
        
    client.shard.broadcastEval(`
    (async () => {
    let channel = this.channels.cache.get("841393455694872597")
    const webhooks = await channel.fetchWebhooks(); 		
    const webhook = webhooks.first();
    
    let embed = {
    color: "#5B00FF",
    author: {
     name: \`Sai de um servidor | (${guild.name}/${guild.id})\`,
    icon_url: \`${icon}\`,
    },
    thumbnail: {
    url: \`${icon}\`,
    },
    fields: [
    {
    name: \`Nome:\`,
    value: \`(\\\`${guild.name}/${guild.id}\\\`)\`,
    },
    {
    name: \`Dono:\`,
    value: \`(\\\`EM DEV\\\`)\`,
    },
    {
    name: \`Total de membros\`,
    value: \`${guild.memberCount}\`,
    },
    ],
    timestamp: new Date(),
    footer: {
    text: \`${guild.id}\`, 
    icon_url: \`${icon}\`, 	
    },
    }
    webhook.send({embeds: [embed] })
    })()`, 0)
    };