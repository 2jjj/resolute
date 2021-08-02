const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config/config.json`);
const ee = require(`../../config/embed.json`);
const emoji = require(`../../config/emojis.json`);

module.exports = {
  name: `adddj`,
  aliases: [`adddjrole`],
  category: `⚙️ Settings`,
  description: `Let's you define a DJ ROLE (as an array, aka you can have multiple)`,
  usage: `@role`,
  example: "@DJ",
  permissoes: {
    membro: ['ADMINISTRATOR', 'Administrador'],
    bot: []
  },
  cooldown: 5,
  args: false,

  run: async (client, message, args) => {
    try {
      let role = message.mentions.roles.first();
      if (!role)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro | Por favor mencione o cargo!`)
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

      if (client.settings.get(message.guild.id, `djroles`).includes(role.id))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`${emoji.msg.ERROR} Erro | Este cargo já esta listado!`)
        );

      client.settings.push(message.guild.id, role.id, `djroles`);

      let leftb = ``;
      if (client.settings.get(message.guild.id, `djroles`).join(``) === ``) leftb = `Sem o cargo de dj, então todos os usuários são djs ^^`
      else
        for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
          leftb += `<@&` + client.settings.get(message.guild.id, `djroles`)[i] + `> | `
        }

      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.SUCCESS} Sucesso! | Adicionei o cargo \`${role.name}\` como cargo de DJ!!`)
        .setDescription(`Todos os cargos de DJ:\n> ${leftb.substr(0, leftb.length - 3)}`)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
        .setDescription(`\`\`\`An error occurred, please try again later\`\`\``)
      );
    }
  }
};