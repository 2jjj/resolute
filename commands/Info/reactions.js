const {
  MessageEmbed
} = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const emoji = require(`../../config/emojis.json`);
module.exports = {
  name: "reacoes",
  category: "info",
  aliases: ["reacts", "reactions"],
  cooldown: 5,
  usage: "reactions",
  description: "Gives you Information, which reaction dues what",
  run: async (client, message, args, user, text, prefix) => {
    try {
      message.inlineReply(new MessageEmbed()
        .setColor(ee.color)
        .setTitle("🩸 My Reactions when playing a Track does those Things")
        .setFooter(ee.footertext, ee.footericon)
        .addField(`Comandos`, musiccmds.join(", "))
        .addField(`Reações`, `${emoji.msg.rewind} Voltar 20 segundos\n${emoji.msg.forward} Avançar 20 segundos\n${emoji.msg.pause_resume} Pausar/Despausar\n${emoji.msg.stop} Parar a música\n${emoji.msg.previous_track} Tocar a música anterior.\n`, true)
        .addField(`\u200b`, `${emoji.msg.skip_track} Pular / Próxima\n${emoji.msg.replay_track} Replay música.\n${emoji.msg.reduce_volume} Volume -10 %\n${emoji.msg.raise_volume} Volume +10 %\n${emoji.msg.toggle_mute} Alternar volume para mudo.`, true)
        .addField(`\u200b`, `${emoji.msg.repeat_mode} Alterar o modo de repetição\n${emoji.msg.autoplay_mode} Ativar o autoplay.\n${emoji.msg.shuffle} Embaralhe a fila.\n${emoji.msg.show_queue} Mostrar a fila.\n${emoji.msg.show_current_track} Mostrar a música atual.`, true)      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`\`\`\`An error occurred, please try again later\`\`\``)
      );
    }
  }
}