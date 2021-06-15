const Discord = require("discord.js")
const guildSchema = require('../mongoDB/guild');


module.exports = async (client, guild) => {


let icon = (!guild.iconURL()?'https://cdn.discordapp.com/attachments/795130563916595270/838503065836584960/PSX_20210502_165304.jpg':guild.iconURL())

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
value: \`(\\\`${guild.owner.user.tag}/${guild.owner.id}\\\`)\`,
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
}