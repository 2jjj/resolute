const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);

module.exports = {
  name: `removedj`,
  aliases: [`deletedj`],
  category: `config`,
  description: `Let's you DELETE a DJ ROLE`,
  usage: `<@cargo>`,
  example: "@DJ",
  permissoes: {
    membro: ['ADMINISTRATOR', 'Administrador'],
    bot: []
  },
  cooldown: 5,
  args: false,
  
  async run(client, message, args, cmduser, text, prefix, player) {

    try {
      let role = message.mentions.roles.first();
      if (!role)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} | Por favor mencione o cargo!`)
        );
        
      try {
        message.guild.roles.cache.get(role.id);
      } catch {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro | Este cargo não existe no servidor!`)
        );
      }
      
      if (!client.settings.get(message.guild.id, `djroles`).includes(role.id))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro | Esse cargo já é um cargo de DJ!`)
        );
        
      client.settings.remove(message.guild.id, role.id, `djroles`);
      
      let leftb = ``;
      if (client.settings.get(message.guild.id, `djroles`).join(``) === ``) leftb = `Sem o cargo de dj, então todos os usuários são djs ^^`
      else
        for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
          leftb += `<@&` + client.settings.get(message.guild.id, `djroles`)[i] + `> | `
        }
        
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Successo | O cargo \`${role.name}\` foi removido como DJ!`)
        .setDescription(`Todos os cargos de DJ restantes:\n> ${leftb.substr(0, leftb.length - 3)}`)
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
