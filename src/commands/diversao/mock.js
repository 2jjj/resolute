const fetch = require('node-fetch');

module.exports = {
  name: "mock",
  aliases: [],
  cooldown: 1000 * 2,
  description: "Manipular texto em um tom sarcástico!",
  category: "fun",
  usage: "<texto>",
  example: "Ola galera",
  args: true,

  async run(client, message, args) {

    let text = args.join("+")
    if (!text) return;

    let res = await fetch('https://api.popcatdev.repl.co/mock?text=' + text);
    let json = await res.json();
    message.channel.send(json.text)
  }
}