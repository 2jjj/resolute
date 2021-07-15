const fetch = require('node-fetch');

module.exports = {
  name: "binario",
  aliases: ['binary'],
  cooldown: 1000 * 2,
  description: "Codifique o texto em números binários",
  category: "fun",
  usage: "<texto>",
  example: "Ola galera",
  args: true,

  async run(client, message, args) {

    let text = args.join("+")
    if (!text) return;

    let res = await fetch('https://api.spr4y.xyz/binario/' + text);
    let json = await res.json();
    message.channel.send(json.binary)
  }
}