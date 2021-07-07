module.exports = async (client, guild) => {

    const guilds = await client.shard.broadcastEval("this.guilds.cache.size")
    const botGuilds = guilds.reduce((prev, val) => prev + val)
    client.channels.cache.get("841353285381914624").setName(`📝│Servidores: ${botGuilds}`).catch((e) => console.log((e)))
    client.channels.cache.get("855968171855839242").setName(`💻│Shards: ${config.shards}`).catch((e) => console.log((e)))

    const guildSchema = require('../../database/mongoDB/guild.js');

    guildSchema.findOneAndDelete({
        Guild: guild.id
    }, async (err, data) => {

        if (err) return console.log(err)
    })

    let icon = (!guild.iconURL() ? 'https://cdn.discordapp.com/avatars/764919941538775050/672afa4f2a4ac5fee624580229a2efbd.png?size=1024' : guild.iconURL())

    client.shard.broadcastEval(`
    (async () => {
    let channel = this.channels.cache.get("841393455694872597")
    const webhooks = await channel.fetchWebhooks(); 		
    const webhook = webhooks.first();
    
    let embed = {
    color: "#5B00FF",
    author: {
     name: \`Fui removido de um servidor | (${guild.name}/${guild.id})\`,
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