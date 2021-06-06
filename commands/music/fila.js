const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "fila",
    aliases: ['queue'],
    cooldown: 1000 * 2, 
    description: "fila",
    category: "musica",
    usage: "",

  run: async (client, message, args) => {

    console.log(`[LOGS] - Comando ${module.exports.name} usado por ${message.author.tag}.`)

    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "Sinto muito, mas você precisa estar em um canal de voz para ver a fila!"
      );
    if (message.guild.me.voice.channel !== message.member.voice.channel) {
      return message.channel.send(
        "**Você tem que estar no mesmo canal de voz com o bot.**"
      );
    }
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send("Não a nada tocando nesse servidor.");
    try {
      let currentPage = 0;
      const embeds = generateQueueEmbed(message, serverQueue.songs);
      const queueEmbed = await message.channel.send(
        `**Current Page - ${currentPage + 1}/${embeds.length}**`,
        embeds[currentPage]
      );
      await queueEmbed.react("⬅️");
      await queueEmbed.react("⏹");
      await queueEmbed.react("➡️");

      const filter = (reaction, user) =>
        ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) &&
        message.author.id === user.id;
      const collector = queueEmbed.createReactionCollector(filter);

      collector.on("collect", async (reaction, user) => {
        try {
          if (reaction.emoji.name === "➡️") {
            if (currentPage < embeds.length - 1) {
              currentPage++;
              queueEmbed.edit(
                `**Pagina atual - ${currentPage + 1}/${embeds.length}**`,
                embeds[currentPage]
              );
            }
          } else if (reaction.emoji.name === "⬅️") {
            if (currentPage !== 0) {
              --currentPage;
              queueEmbed.edit(
                `**Pagina atual - ${currentPage + 1}/${embeds.length}**`,
                embeds[currentPage]
              );
            }
          } else {
            collector.stop();
            reaction.message.reactions.removeAll();
          }
          await reaction.users.remove(message.author.id);
        } catch {
          serverQueue.connection.dispatcher.end();
          return message.channel.send(
            "**Permissões necessárias - [ADD_REACTIONS, MANAGE_MESSAGES]!**"
          );
        }
      });
    } catch {
      serverQueue.connection.dispatcher.end();
      return message.channel.send(
        "**Permissões necessárias - [ADD_REACTIONS, MANAGE_MESSAGES]!**"
      );
    }
  }
};

function generateQueueEmbed(message, queue) {
  const embeds = [];
  let k = 10;
  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;
    const info = current
      .map(track => `${++j} - [${track.title}](${track.url})`)
      .join("\n");
    const embed = new MessageEmbed()
      .setTitle("Fila de músicas\n")
      .setThumbnail(message.guild.iconURL())
      .setColor("GREEN")
      .setDescription(
        `**Som atual ⤵️\n [${queue[0].title}](${queue[0].url})**\n\n${info}`
      )
     .setFooter(`${message.guild}`) 
    .setTimestamp();
    embeds.push(embed);
  }
  return embeds;
}