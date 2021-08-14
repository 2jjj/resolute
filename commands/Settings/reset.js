const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);

module.exports = {
  name: `reset`,
  aliases: [],
  category: `config`,
  description: `Exclui todas as configurações!`,
  usage: ``,
  example: "@DJ",
  permissoes: {
    membro: ['ADMINISTRATOR', 'Administrador'],
    bot: []
  },
  cooldown: 5,
  args: false,
  
  async run(client, message, args, cmduser, text, prefix, player) {
    try {
      if (!message.member.hasPermission(module.exports.permissoes.membro[0])) return;
      if (!message.guild.me.hasPermission(module.exports.permissoes.bot[0])) return;

      if (message.member.guild.owner.id !== message.author.id)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro |Você não tem permissão para este comando! *Apenas o dono do servidor*`)
        );
        
      let themsg = message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`Você realmente quer redefinir todas as configurações?`)
        .setDescription(`*Responda com:* **__\`sim\`__**`)
      ).then((msg) => {
        
        msg.channel.awaitMessages(m => m.author.id === message.author.id, {
          max: 1,
          time: 30 * 1000,
          errors: ['time']
        })
          .then(async collected => {

            if (collected.first().content.toLowerCase() === `sim`) {

              client.setups.set(message.guild.id, {
                textchannel: `0`,
                voicechannel: `0`,
                category: `0`,
                message_cmd_info: `0`,
                message_queue_info: `0`,
                message_track_info: `0`
              });

              client.settings.set(message.guild.id, {
                prefix: prefix,
                djroles: [],
                botchannel: [],
              });

              return message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.SUCCESS} Sucesso | Redefini tudo!`)
                .setDescription(`Prefixo é agora novamente: \`${prefix}\`\nSem cargo de DJ e sem o setup!`)
              );
            }

          }).catch(e => {
            console.log(String(e.stack).yellow)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`${emoji.msg.ERROR} Cancelado!`)
            );
          })
      });
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