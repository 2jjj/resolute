const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);

module.exports = {
  name: `bassboost`,
  category: `👀 Filter`,
  aliases: [`bb`],
  description: `Changes the Bass gain`,
  usage: `<nenhum/baixo/medio/alto>`,
  example: "none",
  permissoes: [],
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },

  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      let level = `nenhum`;

      if (!args.length || (!client.bassboost[args[0].toLowerCase()] && args[0].toLowerCase() != `none`)) return;

      level = args[0].toLowerCase();
      switch (level) {
        case `nenhum`:
          player.setEQ(client.bassboost.none);
          break;
        case `baixo`:
          player.setEQ(client.bassboost.low);
          break;
        case `medio`:
          player.setEQ(client.bassboost.medium);
          break;
        case `alto`:
          player.setEQ(client.bassboost.high);
        case `estourado`:
          player.setEQ(client.bassboost.high);
          break;
      }
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Sucesso! | Bassboost foi setado para \`${level}\``)
        //.setDescription(`Note: *It might take up to 5 seconds until you hear the new Equalizer*`)
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