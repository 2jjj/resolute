const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const { autoplay } = require(`../../handlers/functions`);

module.exports = {
  name: `forceskip`,
  category: `🎶 Music`,
  aliases: [`fs`],
  description: `Forces to skip the current song`,
  usage: `forceskip`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      
      if (player.queue.size == 0) {
        
        if (player.get(`autoplay`)) return autoplay(client, player, `skip`);
        
        player.destroy();
        
        return message.channel.send(new MessageEmbed()
          .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.stop} Stopped and left your Channel`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        );
      }
      
      player.stop();

      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Success | ${emoji.msg.skip_track} Skipped to the next Song`)
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