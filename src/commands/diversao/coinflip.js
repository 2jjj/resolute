module.exports = {
  name: "coinflip",
  aliases: [],
  cooldown: 1000 * 2,
  description: "Jogue cara ou coroa com seus amigos!",
  category: "fun",
  usage: "<cara/coroa>",
  example: "cara",
  args: true,

  async run(client, message, args) {

    var array1 = ["cara", "coroa"];

    var rand = Math.floor(Math.random() * array1.length);

    if (!args[0] || (args[0].toLowerCase() !== "cara" && args[0].toLowerCase() !== "coroa")) {
      return;
    } else if (args[0].toLowerCase() == array1[rand]) {
      message.channel.send("Deu **" + array1[rand] + "** \nVocê ganhou dessa vez!");
    } else if (args[0].toLowerCase() != array1[rand]) {
      message.channel.send("Deu **" + array1[rand] + "** \nVocê perdeu dessa vez!");
    }
  }
}