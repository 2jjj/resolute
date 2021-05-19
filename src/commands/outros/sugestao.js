const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {

  let prefix = db.get(`prefix_${message.guild.id}`)
  if (prefix === null) prefix = "s."

  message.delete();
  const content = args.join(" ");

  if (!args[0]) {
    return message.channel.send(`${message.author.username}, escreva a sugestão após o comando`)
  } else if (content.length > 1000) {
    return message.channel.send(`${message.author.username}, forneça uma sugestão de no máximo 1000 caracteres.`);
  } else {
    var canal = message.guild.channels.cache.find(ch => ch.id === "699780010235527278");
    const msg = await canal.send(
      new Discord.MessageEmbed()
      .setColor("#FFFFF1")
      .addField("<:info:835206734225473546> ⇝ Autor:", message.author)
      .addField("<:info:835206734225473546> ⇝ Conteúdo", content)
      .setFooter("<:info:835206734225473546> ⇝ ID do Autor: " + message.author.id)
      .setTimestamp()
    );
    await message.channel.send(`<:check:843604256455000075> ${message.author} A mensagem foi enviada com sucesso!`);

    const emojis = ["✔️", "❎"];

    for (const i in emojis) {
      await msg.react(emojis[i])
    }
}}
