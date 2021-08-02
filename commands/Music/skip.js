const { MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const { autoplay } = require("../../handlers/functions");
module.exports = {
  name: "forceskip",
  category: "🎶 Music",
  aliases: ["fs"],
  description: "Forces to skip the current song",
  usage: "forceskip",
  run: async (client, message, args, cmduser, text, prefix) => {
    try {

      const { channel } = message.member.voice;

      if (!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Error | You need to join a voice channel.")
        );

      const player = client.manager.players.get(message.guild.id);

      if (!player)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Error | There is nothing playing")
        );

      if (channel.id !== player.voiceChannel)
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle("❌ Error | You need to be in my voice channel to use this command!")
          .setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
        );

      if (player.queue.size == 0) {

        if (player.get("autoplay")) return autoplay(client, player, "skip");

        player.destroy();

        return message.channel.send(new MessageEmbed()
          .setTitle("✅ Success | ⏹ Stopped and left your Channel")
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        );
      }

      player.stop();

      return message.channel.send(new MessageEmbed()
        .setTitle("✅ Success | ⏭ Skipped to the next Song")
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} Erro | Ocorreu um erro!`)
        .setDescription(`\`\`\`Ocorreu um erro. Por favor tente novamente mais tarde\`\`\``)
      );
    }
  }
};