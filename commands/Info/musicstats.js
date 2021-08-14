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
      message.inlineReply(new MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon)
        .addField("⚙️ GLOBAL | Comandos usados:", `>>> \`${Math.ceil(global.commands * client.guilds.cache.array().length / 10)} Comandos\` usados\nem **todos** os servidores.`, true)
        .addField("🎵 GLOBAL | Músicas tocadas:", `>>> \`${Math.ceil(global.songs * client.guilds.cache.array().length / 10)} Músicas\` tocadas em\n**todos** os servidores.`, true)
        .addField("📰 GLOBAL | Setups criados:", `>>> \`${Math.ceil(size)} Setups\` criados em\n**todos** os servidores.`, true)
        .addField("\u200b", "\u200b")
        .addField("⚙️ SERVIDOR | Comandos usados:", `>>> \`${guild.commands} Comandos\` usados\n**nesse** servidor.`, true)
        .addField("🎵 SERVIDOR | Músicas tocadas:", `>>> \`${guild.songs} Músicas\` tocadas\n**nesse** servidor.`, true)
        //.addField("📰 GLOBAL | Premium list:", `>>> \`${guilds.length} Guilds\`\n\`${users.length} Users\`\n having Premium`, true)
        .setTitle(`💿 Estatísticas | ${client.user.username}`)
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