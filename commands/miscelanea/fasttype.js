module.exports = {
    name: "fasttype",
    aliases: [],
    cooldown: 1000 * 2, 
    description: " ",
    category: "outros",
    usage: "",
  
  async run (client, message, args) {
    const { FastType } = require('weky');
    const game = new FastType({
        message: message,
        winMessage: "Você ganhou!", // message sent when user types perfectly
        sentence: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', // sentence-to-be-typed
        loseMessage: 'Perdeu ;(', // message sent when user misspell it
        time: 50000, // time that user has in ms
        startMessage: 'Boa sorte!!' // message sent when user starts playing
    });
    game.start(); 
}}