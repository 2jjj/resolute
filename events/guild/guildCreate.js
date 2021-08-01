const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const { logs } = require(`../../config/webhooks.json`);
const Discord = require("discord.js");
const {
    MessageEmbed
} = require(`discord.js`);

module.exports = async (client, guild) => {
    try {
        let channel = client.channels.cache.get(logs.entradas)
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();

        const embed = new Discord.MessageEmbed()
            .setColor(ee.color)
            .setTitle(`<:setaaa:860626769089265665> Nova guild`)
            .addField('**Servidor**', guild.name, true)
            .addField('**Servidor ID**', guild.id, true)
            .addField('**Fundador**', guild.owner.user.tag)
            .addField('**Membros**', guild.memberCount, true)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setImage(guild.bannerURL({ dynamic: true, size: 1024 }))
            .setFooter(ee.footertext, ee.footericon)
            .setTimestamp();

        await webhook.send(embed);
    } catch { /* */ }
}