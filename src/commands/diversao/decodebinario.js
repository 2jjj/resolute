const fetch = require('node-fetch');

module.exports = {
  name: "decodebinario",
  aliases: ['decode'],
  cooldown: 1000 * 2,
  description: "Decodifique números binários em texto!",
  category: "fun",
  usage: "<numero_binario>",
  example: "011010010111001101110100011011110010000001100101001000000111010101101101001000000111010001100101011100110111010001100101",
  permissoes: [],
  args: true,

  async run(client, message, args) {

    let text = args.join("+")
    if (!text) return;

    let res = await fetch('https://api.popcatdev.repl.co/decode?binary=' + text);
    let json = await res.json();
    message.channel.send(json.text)
  }
}