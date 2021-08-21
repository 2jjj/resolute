//Parei aqui vou jogar mine tchau
const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);

module.exports = {
  name: `removevoteskip`,
  category: `🎶 Music`,
  aliases: [`rvs`, `removeskip`, `removevs`, `votestop`, `stopvote`],
  description: `Remove seu voto do Voteskip!`,
  usage: `removevoteskip`,
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

        if (player.get(`vote-${message.author.id}`)) {
          player.set(`vote-${message.author.id}`, false)
          player.set(`votes`, String(Number(player.get(`votes`)) - 1));
          return message.channel.send(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.SUCCESS} Sucesso | Seus votos foram removidos!`)
            .setDescription(`Agora tem: \`${player.get(`votes`)}\` votos de \`${voteamount}\` votos precisos.`)
          );
        } else {
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`${emoji.msg.ERROR} Erro | Você não votou!`)
            //.setDescription(`There are: \`${player.get(`votes`)}\` of \`${voteamount}\` needed Votes`)
          );
        }
      } else
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro | Não foi possivel remover o seu voto.`)
          .setDescription(`Porque não há configuração de função DJ criada ainda, você pode criar digitando \`${prefix}adddj @DJ\``)
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