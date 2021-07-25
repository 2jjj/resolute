const Discord = require("discord.js")

module.exports = async (client, guild) => {
    const webhook = new Discord.WebhookClient(`841393653155102740`, "vvccMKHnmDK-vNbGNQN98telbtrzCQyQU4fQaJnKG6OKocU5Ht_xfsWtL12LoEex8jQJ")

    let embed = new Discord.MessageEmbed()
        .setTitle(`Novo servidor!`)
        .setDescription(`<:info:835206734225473546> | Servidor: ${guild.name}\n<:info:835206734225473546> | ID: ${guild.id}\n<:info:835206734225473546> | Membros: ${guild.memberCount} membros\n<:info:835206734225473546> | Dono: ${guild.owner.user.tag}/${guild.owner.id}`)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('#00FF00')
    webhook.send(embed)
}