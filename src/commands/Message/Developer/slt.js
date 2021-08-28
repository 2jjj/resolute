const Discord = require("discord.js");
const ownerid = "836345581424738354";

module.exports = {
  name: "serverlist",
  aliases: ['slt', 'guilds'],
  cooldown: 1000 * 2,
  description: "Listar as guilds e os nomes.",
  category: "dev",
  usage: "",
  example: "",
	permissoes: [],
  args: false,

  async run(client, message, args) {

    if (message.author.id == ownerid) {

      let i0 = 0;
      let i1 = 100;
      let page = 1;

      let description =
        `Servidores totais - ${client.guilds.cache.size}\n\n` +
        client.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .map(r => r)
        .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
        .slice(0, 100)
        .join("\n\n");

      console.log(description)

      let embed = new Discord.MessageEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL({
          dynamic: true
        }))
        .setColor("YELLOW")
        .setFooter(`Página - ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
        .setDescription(description);

      let msg = await message.channel.send(embed);

      await msg.react("⬅");
      await msg.react("➡");
      await msg.react("❌");

      let collector = msg.createReactionCollector(
        (reaction, user) => user.id === message.author.id
      );

      collector.on("collect", async (reaction, user) => {
        if (reaction._emoji.name === "⬅") {
          // Updates variables
          i0 = i0 - 10;
          i1 = i1 - 10;
          page = page - 1;

          // if there is no guild to display, delete the message
          if (i0 + 1 < 0) {
            console.log(i0)
            return msg.delete();
          }
          if (!i0 || !i1) {
            return msg.delete();
          }

          description =
            `Servidores totais - ${client.guilds.cache.size}\n\n` +
            client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map(r => r)
            .map(
              (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Memrosers\nID - ${r.id}`)
            .slice(i0, i1)
            .join("\n\n");

          // Update the embed with new informations
          embed
            .setFooter(
              `Páginas - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
            )
            .setDescription(description);

          // Edit the message
          msg.edit(embed);
        }

        if (reaction._emoji.name === "➡") {
          // Updates variables
          i0 = i0 + 10;
          i1 = i1 + 10;
          page = page + 1;

          // if there is no guild to display, delete the message
          if (i1 > client.guilds.cache.size + 10) {
            return msg.delete();
          }
          if (!i0 || !i1) {
            return msg.delete();
          }

          description =
            `Servidores totais - ${client.guilds.cache.size}\n\n` +
            client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map(r => r)
            .map(
              (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membros\nID - ${r.id}`)
            .slice(i0, i1)
            .join("\n\n");

          // Update the embed with new informations
          embed
            .setFooter(
              `Página - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
            )
            .setDescription(description);

          // Edit the message
          msg.edit(embed);
        }

        if (reaction._emoji.name === "❌") {
          return msg.delete();
        }

        // Remove the reaction when the user react to the message
        await reaction.users.remove(message.author.id);
      });
    } else {
      return message.channel.send('não quero');
    }
  }
};