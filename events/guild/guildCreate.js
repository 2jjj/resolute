const Discord = require("discord.js")
const config = require("../.././botconfig/config.json")

module.exports = async (client, guild, message) => {
    //https://discord.com/api/webhooks/841393653155102740/vvccMKHnmDK-vNbGNQN98telbtrzCQyQU4fQaJnKG6OKocU5Ht_xfsWtL12LoEex8jQJ
    const webhook = new Discord.WebhookClient(`841393653155102740`, "vvccMKHnmDK-vNbGNQN98telbtrzCQyQU4fQaJnKG6OKocU5Ht_xfsWtL12LoEex8jQJ")

    const guilds = await client.shard.broadcastEval("this.guilds.cache.size"),
    users = await client.shard.broadcastEval("this.users.cache.size");

    const botGuilds = guilds.reduce((prev, val) => prev + val),
    botUsers = users.reduce((prev, val) => prev + val);

    client.channels.cache.get("841353285381914624").setName(`📝│Servidores: ${botGuilds}`).catch((e) => console.log((e)))
    client.channels.cache.get("862771418484047892").setName(`📝│Users: ${botUsers}`).catch((e) => console.log((e)))
    client.channels.cache.get("855968171855839242").setName(`💻│Shards: ${config.shards}`).catch((e) => console.log((e)))

    const dono = await client.guilds.fetch(guild.id).then(guilda => client.users.fetch(guilda.ownerID).then(o => `${o.tag} (${o.id})`))
    let embed = new Discord.MessageEmbed()
        .setTitle(`Fui adicionado em um servidor!`)
        .setDescription(`<:info:835206734225473546> | Servidor: ${guild.name}\n<:info:835206734225473546> | ID: ${guild.id}\n<:info:835206734225473546> | Membros: ${guild.memberCount} membros\n<:info:835206734225473546> | Dono: ${dono}`)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('#FFC4E7')
    webhook.send(embed);
}