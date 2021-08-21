const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const playermanager = require(`../../handlers/playermanager`);

module.exports = {
  name: `play`,
  category: `🎶 Music`,
  aliases: [`p`],
  description: `Tocar uma música ou video`,
  usage: `play <Song / URL>`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: { "type": "music", "activeplayer": false, "previoussong": false },

  run: async (client, message, args, cmduser, text, prefix, player) => {
    
    try {
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`Por favor, me de o nome da Música ou a URL!`)
        );
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`**Procurando** 🔎`)
        .setDescription(`\`\`\`${text}\`\`\``)
      ).then(msg => {
        msg.delete({ timeout: 5000 }).catch(e => console.log("Could not delete, this prevents a bug"))
      })

      playermanager(client, message, args, `song:youtube`);
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