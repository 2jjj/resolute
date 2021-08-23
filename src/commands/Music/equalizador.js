const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
module.exports = {
  name: `equalizador`,
  category: `👀 Filter`,
  aliases: [`eq`],
  description: `Changes the Equalizer`,
  usage: `<music/bassboost/earrape>`,
  example: "music",
  permissoes: [],
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },

  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      let level = `none`;
      if (!args.length || (!client.eqs[args[0].toLowerCase()] && args[0].toLowerCase() != `none`))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro | O nível do equalizador deve ser um dos seguintes:`)
          .setDescription(`\`music\`, \`pop\`, \`electronic\`, \`classical\`, \`rock\`, \`full\`, \`gaming\`, \`bassboost\`, \`earrape\`\n\nModo de uso: \`${prefix}equalizador <Modo>\`\n\nExample: \`${prefix}equalizador music\``)
        );
      level = args[0].toLowerCase();
      switch (level) {
        case `music`:
          player.setEQ(client.eqs.music);
          break;
        case `pop`:
          player.setEQ(client.eqs.pop);
          break;
        case `electronic`:
        case `electro`:
        case `techno`:
          player.setEQ(client.eqs.electronic);
          break;
        case `classical`:
        case `classic`:
        case `acustics`:
          player.setEQ(client.eqs.classical);
          break;
        case `rock`:
        case `metal`:
          player.setEQ(client.eqs.rock);
          break;
        case `full`:
        case `ful`:
          player.setEQ(client.eqs.full);
          break;
        case `gaming`:
        case `game`:
        case `gam`:
          player.setEQ(client.eqs.gaming);
          break;
        case `music`:
          player.setEQ(client.eqs.music);
          break;
        case `bassboost`:
          player.setEQ(client.eqs.bassboost);
          break;
        case `earrape`:
          player.setVolume(player.volume + 50);
          player.setEQ(client.eqs.earrape);
          break;
      }
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Sucesso | Configurei o equalizador para \`${level}\``)
        .setDescription(`Observação: *Pode levar até 5 segundos até o novo equalizador*`)
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