const Discord = require("discord.js")
const config = require("../../../config/config.json")

module.exports = async (client, guild, message) => {
    let canal = client.channels.cache.get("841393455694872597")

    let embed = new Discord.MessageEmbed()
        .setTitle(`Fui removido de um servidor!!`)
        .setDescription(`<:info:835206734225473546> | Servidor: ${guild.name}\n<:info:835206734225473546> | ID: ${guild.id}\n<:info:835206734225473546> | Membros: ${guild.memberCount} membros\n<:info:835206734225473546> | Dono: ${guild.owner.user.tag}/${guild.owner.id}`)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('#FF0000')
    canal.send(embed);
}