const Discord = require("discord.js")

module.exports = (client, message, guild) => {
//https://discord.com/api/webhooks/841393653155102740/vvccMKHnmDK-vNbGNQN98telbtrzCQyQU4fQaJnKG6OKocU5Ht_xfsWtL12LoEex8jQJ

const webhook = new Discord.WebhookClient(`841393653155102740`, "vvccMKHnmDK-vNbGNQN98telbtrzCQyQU4fQaJnKG6OKocU5Ht_xfsWtL12LoEex8jQJ")
    client.channels.cache.get("841353285381914624").setName(`📝│Servidores: ${client.guilds.cache.size}`).catch((e) => console.log((e)))
    console.log(`Fui removido de uma guild! | ${client.guilds.cache.size} | ${client.users.cache.size}`)
    let embed = new Discord.MessageEmbed()
    .setTitle(`<:info:835206734225473546> | Fui removido de uma guild!`)
    .setTimestamp()
    .setColor('#FFC4E7')
    webhook.send(embed);
}