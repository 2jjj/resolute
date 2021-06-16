module.exports = {
    name: "fasttype",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Você pode competir para ver quem escreve mais rápido!",
    category: "fun",
    usage: "",
  
  async run (client, message, args) {
    const { FastType } = require('weky');
    const game = new FastType({
        message: message,
        winMessage: "Você ganhou!",
        sentence: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', // sentence-to-be-typed
        loseMessage: 'Perdeu ;(',
        time: 50000,
        startMessage: 'Boa sorte!!'
    });
    game.start(); 
}}