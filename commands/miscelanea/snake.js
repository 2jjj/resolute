module.exports = {
    name: "snake",
    aliases: [],
    ooldown: 1000 * 2, 
    description: "Jogo da cobrinha.",
    category: "outros",
    usage: "",
    example: "",

  async run (client, message, args) {
  
    const { Snake } = require('weky');
    new Snake({
        message: message,
        embed: {
        title: 'Snake',
        color: "#gt4668", 
        gameOverTitle: "Game Over", 
        },
        emojis: {
          empty: '⬛',
          snakeBody: '🐍', 
          food: '🥩', 
          //controles
          up: '⬆️', 
          right: '⬅️',
          down: '⬇️',
          left: '➡️',
          },
        }).start()
    }
}