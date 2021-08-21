const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);

module.exports = {
  name: `moveme`,
  category: `🎶 Music`,
  aliases: [`mm`, "mvm", "my", "mvy", "moveyou"],
  description: `Move você para o bot, se está tocando algo`,
  usage: ``,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false, "notsamechannel": true },

  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      let botchannel = message.guild.me.voice.channel;
      if (!botchannel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro | Eu não estou conectado em nenhum lugar.`)
        );
      if (botchannel.userLimit >= botchannel.members.length)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro | O canal está cheio eu não posso te mover.`)
        );
      message.member.voice.setChannel(botchannel);
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Sucesso | Movi você para o canal: \`${botchannel.name}\``)
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
