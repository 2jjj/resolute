const Respostas8Ball = require('./8ball.json')

module.exports = {
  name: 'test',
  aliases: [],
  cooldown: 1000 * 2,
  description: 'testing',
  category: 'misc',
  usage: '<>',
  example: 'test test',
  permissoes: [],
  args: true,

  async run (client, message, args) {
    console.log("I was used!")
  }
}