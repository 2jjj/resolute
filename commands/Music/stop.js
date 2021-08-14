const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);

module.exports = {
  name: `stop`,
  category: `🎶 Music`,
  aliases: [`leave`],
  description: `Stops current track and leaves the channel`,
  usage: `stop`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},

  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      if (!player)
      return message.channel.send(new MessageEmbed()
        .setFooter(ee.footertext, ee.footericon)
        .setColor(ee.wrongcolor)
        .setTitle(`${emoji.msg.ERROR} Erro | Nenhuma música está tocando atualmente nesta guild.`)
      );
      if (!player.queue.current)
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Erro | Nenhuma música está tocando atualmente nesta guild.`)
        );
        
      player.destroy();
      
      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.SUCCESS} Successo | ${emoji.msg.stop} Parei a música e sai de seu canal de voz!`)
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