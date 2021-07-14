const fetch = require('node-fetch');

module.exports = {
  name: "morse",
  aliases: [],
  cooldown: 1000 * 2,
  description: "",
  category: "fun",
  usage: "<text>",
  example: "test",
  args: true,

  async run(client, message, args) {

    let text = args.join("+")
    if (!text) return;

    let res = await fetch('https://api.popcatdev.repl.co/texttomorse?text=' + text);
    let json = await res.json();
    message.channel.send(json.morse)
  }
}