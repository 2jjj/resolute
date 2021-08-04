const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);
const { autoplay } = require(`../../handlers/functions`);

module.exports = {
  name: `voteskip`,
  category: `🎶 Music`,
  aliases: [`skip`, `vs`, `s`],
  description: `Skips the track, but if there is a DJ Setup u will have to vote first!`,
  usage: `voteskip`,
  example: "",
  permissoes: [],
  cooldown: 8,
  args: false,
  parameters: { "type": "music", "activeplayer": true, "previoussong": false },

  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      if (client.settings.get(message.guild.id, `djroles`).toString() !== ``) {

        let channelmembersize = channel.members.size;
        let voteamount = 0;
        if (channelmembersize <= 3) voteamount = 1;
        voteamount = Math.ceil(channelmembersize / 3);

        if (!player.get(`vote-${message.author.id}`)) {
          player.set(`vote-${message.author.id}`, true);
          player.set(`votes`, String(Number(player.get(`votes`)) + 1));
          if (voteamount <= Number(player.get(`votes`))) {
            message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.SUCCESS} Successo | Adicionei o seu voto!`)
              .setDescription(`Quantidade alcançada! Pulando ⏭.`)
            );
            if (player.queue.size == 0) {
              player.destroy();
            } else {
              player.stop();
            }
          } else {
            return message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.SUCCESS} Successo | Adicionado seu voto!`)
              .setDescription(`Há agora: \`${player.get(`votes`)}\` de \`${voteamount}\` votos precisos para eu pular a música!`)
            );
          }
        } else {
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} Erro | Você já votou!!`)
            //.setDescription(`There are: \`${player.get(`votes`)}\` of \`${voteamount}\` needed Votes`)
          );
        }
      } else {

        if (player.queue.size == 0) {

          if (player.get(`autoplay`)) return autoplay(client, player, `skip`);

          player.destroy();

          return message.channel.send(new MessageEmbed()
            .setTitle(`${emoji.msg.SUCCESS} Successo | ${emoji.msg.stop} Parei a música e sai de seu canal de voz!`)
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
          );
        }

        player.stop();

        return message.channel.send(new MessageEmbed()
          .setTitle(`${emoji.msg.SUCCESS} Successo | ${emoji.msg.skip_track} Pulando para a próxima música.`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        );
      }
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