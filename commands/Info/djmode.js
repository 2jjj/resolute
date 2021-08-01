const {
  MessageEmbed
} = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const emoji = require(`../../config/emojis.json`);
module.exports = {
  name: "djmode",
  category: "info",
  aliases: ["djonlymode"],
  cooldown: 5,
  usage: "djmode",
  description: "Shows if there is a DJ-Only Mode / not and all Dj Settings..",
  run: async (client, message, args, user, text, prefix) => {
    try {

      let isdj = false;
      let leftb = "";
      if (client.settings.get(message.guild.id, `djroles`).join("") === "")
        leftb = "no Dj Roles, aka all Users are Djs  "
      else
        for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
          if (message.member.roles.cache.has(client.settings.get(message.guild.id, `djroles`)[i])) isdj = true;
          if (!message.guild.roles.cache.get(client.settings.get(message.guild.id, `djroles`)[i])) continue;
          leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + ">\n"
        }

      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle("💢 Dj Mode")
        .setDescription("If a Command is listed here, and at least one role exists, then it means that you have to have this Role, in order to be able to use these listed Commands")
        .addField("⚠️ Dj Only Commands active for:", `\`${client.settings.get(message.guild.id, `djonlycmds`).sort(function (a, b) { if (a < b) { return -1; } if (a > b) { return 1; } return 0; }).join("`, `")}\``.substr(0, 1024))
        .addField("🎧 Dj Roles", `${leftb.substr(0, leftb.length - 2)}`, true)
        .setFooter(ee.footertext, ee.footericon)
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
}