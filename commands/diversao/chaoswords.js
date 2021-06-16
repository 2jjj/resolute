const { ChaosWords } = require("weky")
var randomWords = require('random-words');

module.exports = {
    name: "chaoswords",
    aliases: [],
    cooldown: 1000 * 2, 
    description: "Ache as palavras!",
    category: "fun",
    usage: "",
  
    async run (client, message, args) {
        const words = randomWords(2) 
        await new ChaosWords({
            message: message,
            maxTries: 8, 
            charGenerated: 20, 
            words: words, 
            embedTitle: 'Chaos words!',
            embedFooter: 'Ache as palavras!',
            embedColor: 'RANDOM'
        }).start()
}}