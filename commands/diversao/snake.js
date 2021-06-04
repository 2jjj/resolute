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
  
        const snakeGame = new SnakeGame({
            title: 'Snake Game',
            color: "GREEN",
            timestamp: true,
            gameOverTitle: "Game Over"
        });
        return snakeGame.newGame(message);
    }
}