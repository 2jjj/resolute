const { MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const { autoplay } = require("../../handlers/functions");
const emoji = require(`../../config/emojis.json`);

module.exports = {
  name: "forceskip",
  category: "🎶 Music",
  aliases: ["fs"],
  description: "Força para pular a música atual",
  usage: "forceskip",
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      const { channel } = message.member.voice;
      if (!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro | Você precisa se juntar a um canal de voz.`)
        );

      const player = client.manager.players.get(message.guild.id);

      if (!player)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro | Não a nada tocando!`)
        );

      if (channel.id !== player.voiceChannel)
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Erro | Você precisa estar no meu canal de voz para usar este comando!`)
          .setDescription(`Canal: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
        );

      if (player.queue.size == 0) {

        if (player.get("autoplay")) return autoplay(client, player, "skip");

        player.destroy();

        return message.channel.send(new MessageEmbed()
          .setTitle(`${emoji.msg.SUCCESS} Successo | Parei a música e sai do canal de voz!`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        );
      }

      player.stop();

      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Successo | Pulei para a próxima música!`)
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