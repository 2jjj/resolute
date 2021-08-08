const { MessageEmbed } = require("discord.js");
const config = require("../../config/config.json");
const ee = require("../../config/embed.json");
const emoji = require(`../../config/emojis.json`);

module.exports = {
  name: "musicstats",
  category: "info",
  aliases: [],
  cooldown: 10,
  usage: "stats",
  description: "Shows music Stats, like amount of Commands and played Songs etc.",
  
  run: async (client, message, args, user, text, prefix) => {
    try {
      let global = client.stats.get("global");
      let guild = client.stats.get(message.guild.id);
      let premiums = client.premium.get("premiumlist", "list");
      let guilds = [];
      let users = [];

      for (let i = 0; i < premiums.length; i++) {
        try {
          if (Object.keys(premiums[i])[0] === "g") {
            let guild = client.guilds.cache.get(Object.values(premiums[i])[0])
            if (!guild) {
              client.premium.get("premiumlist", (value) => value.g === Object.values(premiums[i])[0], "list");
              continue;
            }
            guilds.push(guild.name)
          }
        } catch { }
      }
      for (let i = 0; i < premiums.length; i++) {
        try {
          if (Object.keys(premiums[i])[0] === "u") {
            let user = await client.users.fetch(Object.values(premiums[i])[0]);
            if (!user) {
              client.premium.get("premiumlist", (value) => value.u === Object.values(premiums[i])[0], "list");
              continue;
            }
            users.push(user.tag)
          }
        } catch { }
      }
      let size = client.setups.filter(s => s.textchannel != "0").size + client.guilds.cache.array().length / 3;
      if (size > client.guilds.cache.array().length) size = client.guilds.cache.array().length;
      message.channel.send(new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .addField("⚙️ GLOBAL Commands used:", `>>> \`${Math.ceil(global.commands * client.guilds.cache.array().length / 10)} Commands\` used\nin **all** Servers`, true)
        .addField("🎵 GLOBAL Songs played:", `>>> \`${Math.ceil(global.songs * client.guilds.cache.array().length / 10)} Songs\` played in\n**all** Servers`, true)
        .addField("📰 GLOBAL Setups created:", `>>> \`${Math.ceil(size)} Setups\` created in\n**all** Servers`, true)
        .addField("\u200b", "\u200b")
        .addField("⚙️ SERVER Commands used:", `>>> \`${guild.commands} Commands\` used in\n**this** Server`, true)
        .addField("🎵 SERVER Songs played:", `>>> \`${guild.songs} Songs\` played in\n**this** Server`, true)
        .addField("📰 GLOBAL Premium list:", `>>> \`${guilds.length} Guilds\`\n\`${users.length} Users\`\n having Premium`, true)
        .setTitle(`💿 The Stats of ${client.user.username}`)
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
}