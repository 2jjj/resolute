const Discord = require("discord.js"); 
const client = new Discord.Client();

//https://discord.com/api/webhooks/841393653155102740/vvccMKHnmDK-vNbGNQN98telbtrzCQyQU4fQaJnKG6OKocU5Ht_xfsWtL12LoEex8jQJ
const webhook = new Discord.WebhookClient(`841393653155102740`, "vvccMKHnmDK-vNbGNQN98telbtrzCQyQU4fQaJnKG6OKocU5Ht_xfsWtL12LoEex8jQJ")
client.on("guildDelete", async (guild) => {
    console.log("-1")
    let embed = new Discord.MessageEmbed()
    .setTitle(`-1 server 😔`)
    .setTimestamp()
    .setColor('#FFC4E7')
    webhook.send(embed);
  })