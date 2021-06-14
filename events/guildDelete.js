const Discord = require("discord.js")

module.exports = async (client, guild) => {
    //https://discord.com/api/webhooks/841393653155102740/vvccMKHnmDK-vNbGNQN98telbtrzCQyQU4fQaJnKG6OKocU5Ht_xfsWtL12LoEex8jQJ
    let canal = client.channels.cache.get("841393455694872597")
    let embed = new Discord.MessageEmbed()
    .setTitle("Events - Resolute")
    //.setThumbnail(client.user.displayAvatarURL())
    .addField("Fui removido de uma guild #depressão", `Spray tristezas`)
    .setColor([255,182,193])
    canal.send(embed)
}