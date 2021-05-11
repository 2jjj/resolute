const Discord = require('discord.js')
const client = new Discord.Client(); 

client.on("guildCreate", async (guild) => {
    console.log("oi")
})