const fetch = require('node-fetch');

module.exports = {
  name: "doublestruck",
  aliases: ["ds"],
  cooldown: 1000 * 2,
  description: "Com este comando você vai conseguir falar por 𝕖𝕤𝕤𝕒 𝕗𝕠𝕟𝕥𝕖!",
  category: "outros",
  usage: "<texto>",
  example: "Ola galera!",
  permissoes: [],
  args: true,

  async run(client, message, args) {

    let text = args.join("+")
    if (!text) return;

    let res = await fetch('https://api.popcatdev.repl.co/doublestruck?text=' + text);
    let json = await res.json();
    message.channel.send(json.text)
  }
}