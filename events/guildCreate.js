const Discord = require("discord.js")

module.exports = (client, guild, message, guilds, id) => {

//https://discord.com/api/webhooks/841393653155102740/vvccMKHnmDK-vNbGNQN98telbtrzCQyQU4fQaJnKG6OKocU5Ht_xfsWtL12LoEex8jQJ
const webhook = new Discord.WebhookClient(`841393653155102740`, "vvccMKHnmDK-vNbGNQN98telbtrzCQyQU4fQaJnKG6OKocU5Ht_xfsWtL12LoEex8jQJ")
    console.log(`Fui adicionado em um servidor! | ${client.guilds.cache.size} | ${client.users.cache.size}`)
    client.channels.cache.get("841353285381914624").setName(`📝│Servidores: ${client.guilds.cache.size}`).catch((e) => console.log((e)))
    const dono = client.guilds.fetch(guild.id).then(guilda => client.users.fetch(guilda.ownerID).then(o => `${o.tag} (${o.id})`))
    let embed = new Discord.MessageEmbed()
    .setTitle(`<a:__:835643988022263879> Fui adicionado em um servidor!`)
    .setDescription(`<:info:835206734225473546> | Servidor: ${guild.name}\n<:info:835206734225473546> | ID: ${guild.id}\n<:info:835206734225473546> | Membros: ${guild.memberCount} membros\n<:info:835206734225473546> | Dono: ${dono}`)
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setColor('#FFC4E7')
    webhook.send(embed);
}