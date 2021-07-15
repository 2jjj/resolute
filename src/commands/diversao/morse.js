const fetch = require('node-fetch');

module.exports = {
  name: "morse",
  aliases: [],
  cooldown: 1000 * 2,
  description: "Converte o texto fornecido em código morse!",
  category: "fun",
  usage: "<texto>",
  example: "oi galera",
  args: true,

  async run(client, message, args) {

    let text = args.join("+")
    if (!text) return;

    let res = await fetch('https://api.popcatdev.repl.co/texttomorse?text=' + text);
    let json = await res.json();
    message.channel.send(json.morse)
  }
}