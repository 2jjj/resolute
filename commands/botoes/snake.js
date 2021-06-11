const { Bot, Message } = require('discord.js');
const SnakeGame = require('snakecord')

module.exports = {
    name: "snake",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Jogo da cobrinha",
    category: "fun",
    usage: "",

  async run (client, message, args) {
  
    const { Snake } = require('weky');
    new Snake({
        message: message,
        embed: {
        title: 'Snake', //embed title
        color: "#gt4668", //embed color
        gameOverTitle: "Game Over", //game over embed title
        },
        emojis: {
          empty: '⬛', //zone emoji
          snakeBody: '♿', //snake
          food: '💩', //food emoji
          //control
          up: '⬆️', 
          right: '⬅️',
          down: '⬇️',
          left: '➡️',
          },
        }).start()
    }
}