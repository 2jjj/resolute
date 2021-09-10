const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, track, payload) => {
    
    const channel = client.channels.cache.get(player.textChannel);
    const thing = new MessageEmbed()
        .setColor("RED")
        .setDescription("❌ Erro! \nChame por Spray#7725 ou entre no meu [servidor de suporte](https://discord.gg/GRhdTpsTGE)");
    channel.send({embeds: [thing]});
    client.logger.log(`Track is stuck -> [${player.guild}]`, "error");
    if (!player.voiceChannel) player.destroy();

}