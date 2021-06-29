const Discord = require("discord.js")
const db = require("quick.db");

module.exports = {
  name: "coinflip",
  aliases: [],
  cooldown: 1000 * 2,
  description: "Cara ou coroa?",
  category: "fun",
  usage: "<cara/coroa>",

  async run(client, message, args) {

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) {
      prefix = "s."
    }

    var array1 = ["cara", "coroa"];

    var rand = Math.floor(Math.random() * array1.length);

    if (!args[0] || (args[0].toLowerCase() !== "cara" && args[0].toLowerCase() !== "coroa")) {
      message.reply(`Insira **cara** ou **coroa**. **| ${prefix}coinflip cara**`);
    } else if (args[0].toLowerCase() == array1[rand]) {
      message.channel.send("Deu **" + array1[rand] + "** Você ganhou dessa vez!");
    } else if (args[0].toLowerCase() != array1[rand]) {
      message.channel.send("Deu **" + array1[rand] + "** Você perdeu dessa vez!");
    }
  }
}